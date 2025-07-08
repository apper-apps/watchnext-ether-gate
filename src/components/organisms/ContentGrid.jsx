import { motion } from "framer-motion";
import ContentCard from "@/components/molecules/ContentCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const ContentGrid = ({ 
  content, 
  loading, 
  error, 
  onRetry, 
  onContentSelect,
  searchQuery 
}) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!content || content.length === 0) {
    return <Empty searchQuery={searchQuery} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
    >
      {content.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ContentCard
            content={item}
            onSelect={onContentSelect}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ContentGrid;