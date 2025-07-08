import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong while loading content", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <Card className="p-8 max-w-md mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-error/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center"
        >
          <ApperIcon name="AlertTriangle" size={32} className="text-error" />
        </motion.div>
        
        <h3 className="text-xl font-semibold text-white mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-300 mb-6">
          {message}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={onRetry}
            variant="primary"
            className="flex items-center gap-2"
          >
            <ApperIcon name="RotateCcw" size={16} />
            Try Again
          </Button>
          
          <Button 
            onClick={() => window.location.reload()}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <ApperIcon name="RefreshCw" size={16} />
            Refresh Page
          </Button>
        </div>
        
        <div className="mt-6 p-4 bg-surface/50 rounded-lg">
          <p className="text-sm text-gray-400">
            <strong>Tip:</strong> Try refreshing the page or checking your internet connection
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default Error;