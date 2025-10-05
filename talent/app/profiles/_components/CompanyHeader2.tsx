import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, Edit, Palette, Download } from "lucide-react";
import { useState } from "react";
import EditModal from "./EditModal";
import LogoUpload from "./LogoUpload";
import BackgroundUpload from "./BackgroundUpload";

interface HeaderProps {
  companyData: any;
  onUpdate: (data: any) => void;
}

export default function CompanyHeader2({ companyData: initialData, onUpdate }: HeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [showGradientOptions, setShowGradientOptions] = useState(false);
  const [showBackgroundUpload, setShowBackgroundUpload] = useState(false);
  const [showLogoUpload, setShowLogoUpload] = useState(false);

  const [companyData, setCompanyData] = useState(initialData || {
    name: "L'Oréal Groupe",
    slogan: "Créer la beauté qui fait avancer le monde",
    logo: "",
    logoText: "L'Oréal",
    backgroundImage: "",
    backgroundGradient: "from-pink-50 to-purple-50",
    industry: "Cosmétique, E-commerce, Luxe",
    location: "Clichy",
    website: "https://www.loreal.com",
    foundedYear: 1909,
    employees: 90000,
    genderRatio: "58% / 42%",
    revenue: "43,48 Mds €",
    description: `Notre Raison d'être : Créer la beauté qui fait avancer le monde.`,
    benefits: [],
    commitments: []
  });

  const gradientOptions = [
    { name: "Rose-Violet", value: "from-pink-50 to-purple-50" },
    { name: "Bleu-Vert", value: "from-blue-50 to-green-50" },
    { name: "Orange-Jaune", value: "from-orange-50 to-yellow-50" },
    { name: "Cyan-Bleu", value: "from-cyan-50 to-blue-50" },
    { name: "Violet-Rose", value: "from-violet-50 to-pink-50" },
    { name: "Gris clair", value: "from-gray-50 to-gray-100" },
  ];

  const handleEdit = (field: string, value: string) => {
    setEditField(field);
    setEditValue(value);
    setIsEditing(true);
  };

  const handleSave = async (value: string) => {
    const newData = { [editField]: value };
    setCompanyData({ ...companyData, ...newData });

    if (onUpdate) {
      await onUpdate(newData);
    }

    setIsEditing(false);
    setEditField('');
    setEditValue('');
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setEditField('');
    setEditValue('');
  };

  // Gestion du logo
  const handleLogoUpload = (file: File | null, previewUrl: string) => {
    if (file && previewUrl) {
      setCompanyData({ ...companyData, logo: previewUrl });
      if (onUpdate) {
        onUpdate({ logo: previewUrl });
      }
    } else {
      setCompanyData({ ...companyData, logo: '' });
      if (onUpdate) {
        onUpdate({ logo: '' });
      }
    }
    setShowLogoUpload(false);
  };

  // Gestion de l'image de fond
  const handleBackgroundUpload = (file: File | null, previewUrl: string) => {
    if (file && previewUrl) {
      setCompanyData({
        ...companyData,
        backgroundImage: previewUrl,
        backgroundGradient: ''
      });
      if (onUpdate) {
        onUpdate({ backgroundImage: previewUrl, backgroundGradient: '' });
      }
    } else {
      setCompanyData({ ...companyData, backgroundImage: '' });
      if (onUpdate) {
        onUpdate({ backgroundImage: '' });
      }
    }
    setShowBackgroundUpload(false);
  };

  // Appliquer un dégradé
  const applyGradient = (gradient: string) => {
    setCompanyData({
      ...companyData,
      backgroundGradient: gradient,
      backgroundImage: ''
    });
    setShowGradientOptions(false);

    if (onUpdate) {
      onUpdate({ backgroundGradient: gradient, backgroundImage: '' });
    }
  };

  // Mettre à jour le texte du logo
  const handleLogoTextChange = (text: string) => {
    setCompanyData({ ...companyData, logoText: text });
    if (onUpdate) {
      onUpdate({ logoText: text });
    }
  };

  // Télécharger la configuration
  const downloadConfig = () => {
    const config = {
      companyData: {
        name: companyData.name,
        slogan: companyData.slogan,
        logo: companyData.logo,
        logoText: companyData.logoText,
        backgroundImage: companyData.backgroundImage,
        backgroundGradient: companyData.backgroundGradient,
        industry: companyData.industry,
        location: companyData.location,
        website: companyData.website,
      }
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${companyData.name.replace(/\s+/g, '_')}_config.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const industries = companyData.industry?.split(', ') || [];

  const backgroundStyle = companyData.backgroundImage
    ? {
      backgroundImage: `url(${companyData.backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }
    : {};

  const backgroundClass = companyData.backgroundImage
    ? "" // pas de gradient si on a une image
    : `bg-gradient-to-r ${companyData.backgroundGradient}`;

  return (
    <section
      className={`py-12 relative ${backgroundClass}`}
      style={backgroundStyle}
    >
      {/* Overlay pour lisibilité */}
      {companyData.backgroundImage && (
        <div className="absolute inset-0 bg-black/20 z-0"></div>
      )}

      {/* Contrôles d'arrière-plan */}
      <div className="absolute top-4 right-4 z-20">
        <div className="flex flex-col gap-2 bg-white bg-opacity-90 p-3 rounded-lg shadow-lg">
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="secondary"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setShowBackgroundUpload(true)}
              title="Télécharger une image de fond"
            >
              <Download className="h-3 w-3" />
              Image
            </Button>

            <Button
              variant="secondary"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setShowGradientOptions(!showGradientOptions)}
              title="Choisir un dégradé"
            >
              <Palette className="h-3 w-3" />
              Dégradé
            </Button>

            <Button
              variant="secondary"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setShowLogoUpload(true)}
              title="Modifier le logo"
            >
              <Edit className="h-3 w-3" />
              Logo
            </Button>
          </div>

          {showGradientOptions && (
            <div className="grid grid-cols-3 gap-2 mt-2 p-2 bg-gray-50 rounded">
              {gradientOptions.map((gradient, index) => (
                <button
                  key={index}
                  className={`h-8 rounded border-2 ${companyData.backgroundGradient === gradient.value
                    ? 'border-blue-500'
                    : 'border-gray-300'
                    } bg-gradient-to-r ${gradient.value}`}
                  onClick={() => applyGradient(gradient.value)}
                  title={gradient.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contenu */}
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Section Logo */}
          <div className="relative group">
            <div className="w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center p-4 border-2 border-dashed border-gray-300">
              {companyData.logo ? (
                <img
                  src={companyData.logo}
                  alt={`${companyData.name} logo`}
                  className="w-full h-full object-contain rounded"
                />
              ) : (
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-800">{companyData.logoText}</span>
                </div>
              )}
            </div>

            <div
              className="absolute -top-2 -right-2 h-6 w-6 text-gray-400 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity bg-white rounded-full p-1 shadow-md"
              onClick={() => setShowLogoUpload(true)}
              title="Modifier le logo"
            >
              <Edit className="h-4 w-4" />
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 group">
                  <h1
                    className="text-4xl font-bold text-gray-900 cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition-colors"
                    onClick={() => handleEdit('name', companyData.name)}
                  >
                    {companyData.name}
                  </h1>
                  <Edit
                    className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                    onClick={() => handleEdit('name', companyData.name)}
                  />
                </div>

                {/* ✅ Slogan affiché UNE seule fois */}
                <div className="flex items-center gap-2 group mt-2">
                  <p
                    className="text-lg text-gray-600 italic cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition-colors"
                    onClick={() => handleEdit('slogan', companyData.slogan)}
                  >
                    {companyData.slogan}
                  </p>
                  <Edit
                    className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                    onClick={() => handleEdit('slogan', companyData.slogan)}
                  />
                </div>

                <div className="flex items-center gap-2 mt-2 group">
                  <div className="flex flex-wrap gap-2">
                    {industries.map((industry: string, index: number) => (
                      <Badge key={index} variant="secondary">{industry.trim()}</Badge>
                    ))}
                  </div>
                  <Edit
                    className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                    onClick={() => handleEdit('industry', companyData.industry)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={downloadConfig}
                >
                  <Download className="h-4 w-4" />
                  Exporter
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Preview
                </Button>
              </div>
            </div>

            {/* Localisation */}
            <div className="flex items-center gap-2 text-gray-600 mb-4 group">
              <MapPin className="h-5 w-5" />
              <span
                className="cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition-colors"
                onClick={() => handleEdit('location', companyData.location)}
              >
                {companyData.location}
              </span>
              <Edit
                className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                onClick={() => handleEdit('location', companyData.location)}
              />
            </div>

            {/* Site web */}
            <div className="flex items-center gap-2 group">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                asChild
              >
                <a href={companyData.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Voir le site
                </a>
              </Button>
              <Edit
                className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity ml-2"
                onClick={() => handleEdit('website', companyData.website)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showLogoUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Modifier le logo</h3>
              <button onClick={() => setShowLogoUpload(false)} className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>
            <LogoUpload
              onFileChange={handleLogoUpload}
              currentPreview={companyData.logo}
              logoText={companyData.logoText}
              onLogoTextChange={handleLogoTextChange}
            />
          </div>
        </div>
      )}

      {showBackgroundUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Modifier l'image de fond</h3>
              <button onClick={() => setShowBackgroundUpload(false)} className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>
            <BackgroundUpload
              onFileChange={handleBackgroundUpload}
              currentPreview={companyData.backgroundImage}
            />
          </div>
        </div>
      )}

      <EditModal
        isOpen={isEditing}
        onClose={handleCloseModal}
        title={`Modifier ${editField}`}
        value={editValue}
        onSave={handleSave}
        isTextarea={editField === 'description' || editField === 'slogan'}
        label={`Modifier le ${editField} de l'entreprise`}
        placeholder={
          editField === 'industry'
            ? "Entrez les industries séparées par des virgules"
            : editField === 'website'
              ? "Entrez l'URL complète du site"
              : editField === 'slogan'
                ? "Entrez le slogan de l'entreprise"
                : `Entrez le nouveau ${editField}`
        }
        maxLength={editField === 'description' ? 1000 : 200}
      />
    </section>
  );
}
