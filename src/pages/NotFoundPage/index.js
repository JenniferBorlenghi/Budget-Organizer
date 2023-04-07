import PageContainer from "./../../components/PageContainer";
import pageNotFoundImage from "./../../includes/pageNotFoundImage.png";
import { Link } from "react-router-dom";
import "./styles.scss";

export default function NotFoundPage() {
  return (
    <PageContainer title="Page Not Found" className="not-found-page">
      <p>
        This page does not exist. Access your dashboard <Link to="/">here</Link>
        .
      </p>
      <img src={pageNotFoundImage} alt="not-found" />
    </PageContainer>
  );
}
