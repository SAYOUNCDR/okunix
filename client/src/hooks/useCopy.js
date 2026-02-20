import { useState, useCallback } from "react";

/**
 * A custom hook for copying text to the clipboard with a temporary success state.
 * @param {number} timeout - How long the success state should persist (default: 2000ms)
 * @returns {[string | boolean | null, function]} - Returns the current copied state and the copy function.
 */
const useCopy = (timeout = 2000) => {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = useCallback(
    (text, key = true) => {
      if (!text) return;

      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(key);
          setTimeout(() => {
            setCopied(null);
          }, timeout);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    },
    [timeout],
  );

  return [copied, copyToClipboard];
};

export default useCopy;
