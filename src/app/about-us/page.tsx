import DocumentPage from '../components/DocumentPage';
import aboutUsData from '../data/about_us.json';

export default function AboutUs() {
  return (
    <DocumentPage 
      title="About Us" 
      content={aboutUsData.content} 
    />
  );
} 