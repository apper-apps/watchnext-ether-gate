import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="overflow-hidden">
            {/* Poster skeleton */}
            <div className="aspect-[2/3] bg-gray-700 shimmer" />
            
            {/* Content skeleton */}
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="h-6 bg-gray-700 rounded w-3/4 shimmer" />
                <div className="h-4 bg-gray-700 rounded w-8 shimmer" />
              </div>
              
              <div className="h-4 bg-gray-700 rounded w-1/2 shimmer" />
              
              <div className="flex gap-2">
                <div className="h-6 bg-gray-700 rounded w-16 shimmer" />
                <div className="h-6 bg-gray-700 rounded w-20 shimmer" />
              </div>
              
              <div className="flex gap-2">
                <div className="h-5 bg-gray-700 rounded w-12 shimmer" />
                <div className="h-5 bg-gray-700 rounded w-16 shimmer" />
                <div className="h-5 bg-gray-700 rounded w-8 shimmer" />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default Loading;