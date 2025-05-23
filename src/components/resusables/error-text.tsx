import { defaultMotionConfig } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";

export default function ErrorText({ value }: { value?: { message?: string } }) {
  return (
    <AnimatePresence>
      {value?.message && ( // ✅ Check if message exists before rendering
        <motion.div
          {...defaultMotionConfig}
          className="text-destructive dark:text-chart-5 text-sm overflow-hidden">
          {value.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
