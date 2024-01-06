import React, { FC } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/renderer/components/ui/lamp";
import { store } from "@/renderer/stores";
import { observer } from "mobx-react-lite";
import { formatTime } from "@/renderer/lib/formatTime";

const Header: FC = observer(() => {
  const timeStore = store.time;
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        <div>Your work time is</div>
        <div>{formatTime(timeStore.time)}</div>
      </motion.h1>
    </LampContainer>
  );
});

export default Header;
