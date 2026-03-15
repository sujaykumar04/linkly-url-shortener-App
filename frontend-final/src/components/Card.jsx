import React from "react";
import { motion } from "motion/react";

const Card = ({ title, desc }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="card card-hover p-6 flex flex-col gap-3"
    >
      <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/30
                      flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-primary-500" />
      </div>
      <h3 className="font-semibold text-slate-800 dark:text-white text-sm">
        {title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
};

export default Card;
