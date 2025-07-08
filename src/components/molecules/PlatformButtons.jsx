import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const PlatformButtons = ({ platforms, className = "" }) => {
  const getPlatformColor = (platform) => {
    const colors = {
      "Netflix": "bg-netflix hover:bg-red-700",
      "Prime Video": "bg-prime hover:bg-blue-600",
      "Disney+": "bg-disney hover:bg-blue-800",
      "Hulu": "bg-hulu hover:bg-green-600",
      "HBO Max": "bg-hbo hover:bg-purple-800",
      "Apple TV+": "bg-apple hover:bg-gray-800",
      "Paramount+": "bg-paramount hover:bg-blue-700",
      "Peacock": "bg-peacock hover:bg-orange-700"
    };
    return colors[platform] || "bg-gray-600 hover:bg-gray-700";
  };

  const handlePlatformClick = (platform) => {
    if (platform.link) {
      window.open(platform.link, "_blank");
    } else {
      console.log(`Opening ${platform.name}`);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <h4 className="text-lg font-semibold text-white">Watch Now</h4>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {platforms.map((platform, index) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant="platform"
              className={`w-full justify-between ${getPlatformColor(platform.name)}`}
              onClick={() => handlePlatformClick(platform)}
            >
              <div className="flex items-center gap-2">
                <ApperIcon name="Play" size={16} />
                <span>{platform.name}</span>
              </div>
              
              <div className="flex items-center gap-2">
                {platform.price && (
                  <span className="text-sm opacity-80">{platform.price}</span>
                )}
                <ApperIcon name="ExternalLink" size={14} />
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
      
      {platforms.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <ApperIcon name="AlertCircle" size={24} className="mx-auto mb-2 opacity-50" />
          <p>Not currently available on supported platforms</p>
        </div>
      )}
    </div>
  );
};

export default PlatformButtons;