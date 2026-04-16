import AdhesionPageClient, { type LicenceId } from "./AdhesionPageClient";

function getLicenceFromParam(value: string | string[] | undefined): LicenceId {
  const licenceValue = Array.isArray(value) ? value[0] : value;
  const normalizedValue = licenceValue
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (normalizedValue === "jeune" || normalizedValue === "decouverte") {
    return normalizedValue;
  }

  return "adulte";
}

export default function AdhesionPage({
  searchParams,
}: {
  searchParams?: { licence?: string | string[] };
}) {
  return <AdhesionPageClient initialLicence={getLicenceFromParam(searchParams?.licence)} />;
}
