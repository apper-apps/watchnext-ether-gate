import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ searchQuery }) => {
  const suggestions = [
    "Comedy movies with Ryan Reynolds",
    "Shows like The Office",
    "Best action movies of 2023",
    "Sci-fi series on Netflix",
    "Movies with Leonardo DiCaprio",
    "Horror movies from the 80s"
  ];

  const handleSuggestionClick = (suggestion) => {
    // This would trigger a new search
    console.log("Searching for:", suggestion);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <Card className="p-8 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-primary/20 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center"
        >
          <ApperIcon name="Search" size={48} className="text-primary" />
        </motion.div>
        
        {searchQuery ? (
          <>
            <h3 className="text-2xl font-semibold text-white mb-3">
              No results found for "{searchQuery}"
            </h3>
            
            <p className="text-gray-300 mb-6">
              We couldn't find any movies or TV shows matching your search. 
              Try rephrasing your query or browse our suggestions below.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-semibold text-white mb-3">
              Ready to discover something amazing?
            </h3>
            
            <p className="text-gray-300 mb-6">
              Use natural language to find your perfect movie or TV show. 
              Ask me anything about what you want to watch!
            </p>
          </>
        )}
        
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white">Try these searches:</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-3 bg-surface/50 hover:bg-surface border border-gray-700 hover:border-primary rounded-lg text-sm text-gray-300 hover:text-white transition-all duration-200 flex items-center gap-2"
              >
                <ApperIcon name="ArrowRight" size={14} className="text-primary" />
                {suggestion}
              </motion.button>
            ))}
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-gradient-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-2 text-primary mb-2">
            <ApperIcon name="Lightbulb" size={20} />
            <span className="font-medium">Pro Tips</span>
          </div>
          <ul className="text-sm text-gray-300 space-y-1 text-left">
            <li>• Be specific: "Comedy movies with Will Ferrell"</li>
            <li>• Ask for similar content: "Shows like Stranger Things"</li>
            <li>• Filter by time: "Best movies of 2023"</li>
            <li>• Search by mood: "Feel-good romantic comedies"</li>
          </ul>
        </div>
      </Card>
    </motion.div>
  );
};

export default Empty;