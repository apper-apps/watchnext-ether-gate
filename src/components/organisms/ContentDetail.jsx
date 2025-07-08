import { motion } from "framer-motion";
import { useState } from "react";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import PlatformButtons from "@/components/molecules/PlatformButtons";
import ApperIcon from "@/components/ApperIcon";

const ContentDetail = ({ content, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const getRatingColor = (rating) => {
    if (rating >= 8) return "text-green-400";
    if (rating >= 6) return "text-yellow-400";
    return "text-red-400";
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "Info" },
    { id: "cast", label: "Cast", icon: "Users" },
    { id: "watch", label: "Watch", icon: "Play" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-surface border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="relative">
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="bg-black/50 hover:bg-black/70 text-white"
            >
              <ApperIcon name="X" size={20} />
            </Button>
          </div>
          
          <div className="relative h-64 bg-gradient-to-t from-surface to-transparent">
            <img
              src={content.posterUrl}
              alt={content.title}
              className="w-full h-full object-cover opacity-30"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-end gap-6">
                <img
                  src={content.posterUrl}
                  alt={content.title}
                  className="w-32 h-48 object-cover rounded-lg shadow-lg"
                />
                
                <div className="flex-1">
                  <h1 className="text-4xl font-display font-bold text-white mb-2">
                    {content.title}
                  </h1>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <ApperIcon name="Star" size={16} className={getRatingColor(content.rating)} />
                      <span className={`font-semibold ${getRatingColor(content.rating)}`}>
                        {content.rating}
                      </span>
                    </div>
                    
                    <span className="text-gray-300">{content.year}</span>
                    
                    <Badge variant="secondary" className="capitalize">
                      {content.type}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {content.genres.map((genre, index) => (
                      <Badge key={index} variant="primary" className="text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-700">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <ApperIcon name={tab.icon} size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Synopsis</h3>
                <p className="text-gray-300 leading-relaxed">{content.synopsis}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Popularity</h3>
                <div className="flex items-center gap-2">
                  <div className="bg-gray-700 rounded-full h-2 w-48">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full"
                      style={{ width: `${(content.popularity / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400">{content.popularity}/10</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "cast" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Cast</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.cast.map((actor, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-surface/50 rounded-lg">
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                      <ApperIcon name="User" size={20} className="text-gray-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{actor.name}</p>
                      <p className="text-sm text-gray-400">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "watch" && (
            <PlatformButtons platforms={content.platforms} />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContentDetail;