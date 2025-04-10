import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

interface ImageUploadOverlayProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ImageUploadOverlay({ onFileChange }: ImageUploadOverlayProps) {
  return (
    <motion.div
      className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center cursor-pointer"
      whileHover={{ opacity: 0.8 }}>
      <ImageIcon className="w-10 h-10 text-white mb-2" />
      <span className="text-white font-medium">Change Image</span>
      <input
        type="file"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={onFileChange}
        accept="image/*"
      />
    </motion.div>
  );
}
