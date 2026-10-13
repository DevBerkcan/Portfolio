import LegalPage from "@/components/layout/LegalPage";
import { copy } from "@/lib/constants";

export default function NotFound() {
  return (
    <LegalPage title={copy.notFound.title}>
      <p>{copy.notFound.text}</p>
    </LegalPage>
  );
}
