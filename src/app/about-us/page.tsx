import DocumentPage from '../components/DocumentPage';
import attachmentData from '../data/Home-Fitness-attachment.json';

export default function AboutUs() {
  return (
    <DocumentPage 
      title="About Us" 
      content={attachmentData.about} 
    />
  );
} 