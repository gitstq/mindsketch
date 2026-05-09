import React from 'react';
import { motion } from 'framer-motion';
import { 
  Pencil, 
  Github, 
  BookOpen, 
  Info,
  Sparkles
} from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 h-14 bg-white/95 backdrop-blur border-b border-gray-200 z-40 flex items-center justify-between px-4"
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg">
          <Pencil size={18} className="text-white" />
        </div>
        <div>
          <h1 className="font-bold text-gray-900 text-lg leading-tight">MindSketch</h1>
          <p className="text-xs text-gray-500">AI 智能白板</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-1">
        <a
          href="#features"
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Sparkles size={14} />
          <span>功能特性</span>
        </a>
        <a
          href="https://github.com/gitstq/mindsketch"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Github size={14} />
          <span>GitHub</span>
        </a>
        <a
          href="#docs"
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <BookOpen size={14} />
          <span>文档</span>
        </a>
        <a
          href="#about"
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Info size={14} />
          <span>关于</span>
        </a>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
          v1.0.0
        </span>
      </div>
    </motion.header>
  );
};
