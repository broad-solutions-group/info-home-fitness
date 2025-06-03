import DocumentPage from '../components/DocumentPage';
import attachmentData from '../data/Home-Fitness-attachment.json';
import { transformMarkdown } from '../../utils';

export default function AboutUs() {
  const transformedContent = transformMarkdown(attachmentData.about);
  
  return (
    <DocumentPage 
      title="About Us" 
      content={transformedContent} 
    />
  );
} 