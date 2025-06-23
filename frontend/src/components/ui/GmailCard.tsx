import React, { useState } from "react";

import { Mail, Check, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

import Button from "./Button";
import { supabase } from "@/libs/supabaseClient";
import { toast } from "sonner";

const GmailCard: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const accessToken = session?.access_token;

    if (!accessToken) {
      toast.error("You must be logged in to connect Gmail");
      return;
    }

    const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
      import.meta.env.VITE_GOOGLE_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_GOOGLE_REDIRECT_URL
    }&response_type=code&scope=https://www.googleapis.com/auth/gmail.send%20email%20openid%20profile&access_type=offline&prompt=consent`;

    localStorage.setItem("supabase_token", accessToken);
    window.location.href = googleAuthURL;
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <div className=" bg-black/50 backdrop-blur-sm fixed z-50 inset-0 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{
          opacity: 0,
          scale: 0.9,
          transition: { duration: 0.15, ease: "easeIn" },
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-neutral-800 rounded-lg shadow-md p-6 text-center border border-neutral-600"
      >
        {isConnected ? (
          <>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-green-700">
              Gmail connected successfully
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              You can now send emails directly through your Gmail account.
            </p>
            <button
              className="mt-6 w-full border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded"
              onClick={handleDisconnect}
            >
              Disconnect Gmail
            </button>
          </>
        ) : (
          <>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-700 border border-neutral-600">
              <Mail className="h-8 w-8 text-cyan-500" />
            </div>
            <h2 className="text-xl font-semibold">Connect your Gmail</h2>
            <p className="text-sm text-gray-300 mt-1">
              Send emails directly through your Gmail account.
            </p>
            <Button
              onClick={handleConnect}
              variant="secondary"
              disabled={isConnecting}
              className={`mt-6 w-full py-2 px-4 rounded text-white font-medium ${isConnecting}`}
            >
              {isConnecting ? "Connecting..." : "Connect Gmail"}
            </Button>

            <div className="flex justify-center mt-4 relative">
              <button
                className="flex items-center gap-1 text-xs text-gray-300 hover:text-gray-400 transition-colors"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <HelpCircle className="h-3 w-3" />
                Why do we need this?
              </button>
              {showTooltip && (
                <div className="absolute mt-8 max-w-xs bg-neutral-800 border border-neutral-600 text-sm text-gray-200 p-3 rounded shadow-md z-10">
                  We need access to your Gmail account to send emails on your
                  behalf. This allows you to use your own email address and
                  maintain your sender reputation.
                </div>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default GmailCard;
