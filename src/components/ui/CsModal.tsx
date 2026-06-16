import { Rocket } from "lucide-react";
import { motion } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

interface CsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const CsModal = ({ open, onOpenChange }: CsModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-background/95 backdrop-blur-xl border-border sm:max-w-md">
                <DialogHeader className="text-center sm:text-center">
                    <motion.div
                        className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Rocket className="w-8 h-8 text-color" />
                        </motion.div>
                    </motion.div>

                    <DialogTitle className="text-2xl font-bold">
                        <span className="gradient-text">Coming Soon</span>
                    </DialogTitle>

                    <DialogDescription className="text-white/80 mt-2">
                        We're working hard to bring you the next generation of DeFi
                        liquidity infrastructure. Stay tuned!
                    </DialogDescription>
                </DialogHeader>

                <motion.div
                    className="mt-6 flex flex-col gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <motion.a
                        href="https://x.com/Balcore_ai"
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary w-full justify-center flex items-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Follow for Updates
                    </motion.a>

                    <motion.button
                        onClick={() => onOpenChange(false)}
                        className="w-full py-2.5 px-4 rounded-lg border border-border text-white/80 hover:text-white hover:border-primary/50 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Close
                    </motion.button>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
};

export default CsModal;