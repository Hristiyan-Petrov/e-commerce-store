import { motion, AnimatePresence } from 'motion/react';

export default function IconPopTransition({
    condition,
    defaultIcon,
    alternateIcon,
}) {
    const variants = {
        hidden: {
            opacity: 0,
            scale: 0.5,
            transition: {
                duration: 0.15,
            },
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.15
            }
        },
    };

    return (
        <AnimatePresence mode="wait" initial={false}>
            {condition
                ? <motion.div
                    key="opened-icon"
                    style={{ display: "flex" }}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    {alternateIcon}
                </motion.div>
                : <motion.div
                    key="closed-icon"
                    style={{ display: "flex" }}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    {defaultIcon}
                </motion.div>
            }
        </AnimatePresence>
    );
};