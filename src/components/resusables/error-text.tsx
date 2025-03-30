import { defaulttMotionConfig } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";

export default function ErrorText({ value }: { value?: { message?: string } }) {
  return (
    <AnimatePresence>
      {value?.message && ( // ✅ Check if message exists before rendering
        <motion.div
          {...defaulttMotionConfig}
          className="text-destructive text-sm overflow-hidden">
          {value.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
