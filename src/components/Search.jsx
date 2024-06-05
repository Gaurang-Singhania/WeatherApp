import React from 'react';
import { motion } from 'framer-motion';
import { IoMdSearch, IoMdLocate } from 'react-icons/io';

const Search = ({ input, handleInput, handleSubmit, handleLocation }) => {
  return (
    <motion.form
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      onSubmit={handleSubmit}
      className="h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8 shadow-lg"
    >
      <div className="h-full relative flex items-center justify-between p-2 ">
        <motion.input
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          type="text"
          placeholder="Search Your Preferred City or Country"
          className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full"
          value={input}
          onChange={handleInput}
        />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center space-x-2"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="bg-pink-500 hover:bg-pink-400 w-12 h-12 flex rounded-full justify-center items-center transition"
          >
            <IoMdSearch className="text-2xl text-white" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            className="bg-pink-500 hover:bg-pink-400 w-12 h-12 flex rounded-full justify-center items-center transition"
            onClick={handleLocation}
          >
            <IoMdLocate className="text-2xl text-white" />
          </motion.button>
        </motion.div>
      </div>
    </motion.form>
  );
};

export default Search;
