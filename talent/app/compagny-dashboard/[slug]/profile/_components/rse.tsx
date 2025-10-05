
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RiLeafLine, RiTeamLine, RiWaterFlashLine, RiPlantLine, RiRecycleLine,RiUserHeartLine,RiArrowRightLine,RiFriendicaFill,
  RiGlobalLine,RiLightbulbFlashLine,RiHeartLine,RiBookOpenLine,RiEditLine,RiAddLine,RiDeleteBinLine} from '@remixicon/react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Types corrigés
interface Engagement {
  icon: any;
  title: string;
  progress?: number;
  value?: string;
  description: string;
}

interface Stat {
  icon: any;
  value: string;
  label: string;
  description: string;
}

interface Initiative {
  title: string;
  description: string;
  icon: any;
  impact: string;
}

interface RSESection {
  title: string;
  description: string;
  fullDescription: string;
  type: 'engagements' | 'jeunesse' | 'france';
  data: (Engagement | Stat)[];
}

interface RSEData {
  lorealPourLeFutur: RSESection;
  lorealPourLaJeunesse: RSESection;
  lorealEnFrance: RSESection;
  initiatives: Initiative[];
}

const defaultRSEData: RSEData = {
  lorealPourLeFutur: {
    title: "L'ORÉAL POUR LE FUTUR",
    description: "Le Groupe L'Oréal porte la conviction que les entreprises ont un rôle concret à jouer pour faire face aux enjeux actuels.",
    fullDescription: `Le programme L'Oréal pour le Futur a été lancé en 2020, il incarne l'ambition du Groupe en matière de transformation sociale et environnementale.`,
    type: 'engagements',
    data: [
      {
        icon: RiLeafLine,
        title: "Lutter contre le réchauffement climatique",
        progress: 85,
        description: "Réduction des émissions de CO2 de nos sites industriels"
      }
    ]
  },
  lorealPourLaJeunesse: {
    title: "L'ORÉAL POUR LA JEUNESSE",
    description: "L'Oréal pour la Jeunesse offre aux jeunes de multiples opportunités professionnelles de début de carrière.",
    fullDescription: `Les jeunes sont au cœur de l'écosystème de L'Oréal...`,
    type: 'jeunesse',
    data: [
      {
        icon: RiTeamLine,
        title: "Partenariats et sensibilisation",
        value: "Millions de jeunes accompagnés",
        description: "Avec l'aide des gouvernements, des fondations, des universités et le secteur privé"
      }
    ]
  },
  lorealEnFrance: {
    title: "L'ORÉAL EN FRANCE",
    description: "L'Oréal participe de manière significative à la compétitivité économique de la France.",
    fullDescription: `L'Oréal participe de manière significative à la compétitivité économique de la France...`,
    type: 'france',
    data: [
      {
        icon: RiFriendicaFill,
        value: "94 000",
        label: "emplois générés en France",
        description: "Nous employons en France 15 000 salariés..."
      }
    ]
  },
  initiatives: [
    {
      title: "Fondation L'Oréal",
      description: "Soutenir les femmes en situation de grande vulnérabilité",
      icon: RiHeartLine,
      impact: "50+ pays concernés"
    }
  ]
};

const iconOptions = {
  RiLeafLine, RiTeamLine, RiWaterFlashLine, RiPlantLine, RiRecycleLine,
  RiUserHeartLine, RiFriendicaFill, RiGlobalLine, RiLightbulbFlashLine,
  RiHeartLine, RiBookOpenLine
};

export default function RSEPage() {
  const [rseData, setRseData] = useState<RSEData>(defaultRSEData);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState<keyof Omit<RSEData, 'initiatives'> | null>(null);
  const [editingInitiative, setEditingInitiative] = useState<number | null>(null);

  // CRUD Operations pour les sections RSE
  const updateSection = (section: keyof Omit<RSEData, 'initiatives'>, updates: Partial<RSESection>) => {
    setRseData({
      ...rseData,
      [section]: { ...rseData[section], ...updates }
    });
    setEditingSection(null);
  };

  const updateInitiative = (index: number, updates: Partial<Initiative>) => {
    const newInitiatives = [...rseData.initiatives];
    newInitiatives[index] = { ...newInitiatives[index], ...updates };
    setRseData({ ...rseData, initiatives: newInitiatives });
    setEditingInitiative(null);
  };

  const addInitiative = () => {
    const newInitiative: Initiative = {
      title: "Nouvelle initiative",
      description: "Description de l'initiative",
      icon: RiHeartLine,
      impact: "Impact de l'initiative"
    };
    setRseData({
      ...rseData,
      initiatives: [...rseData.initiatives, newInitiative]
    });
  };

  const deleteInitiative = (index: number) => {
    setRseData({
      ...rseData,
      initiatives: rseData.initiatives.filter((_, i) => i !== index)
    });
  };

  const addEngagement = (section: keyof Omit<RSEData, 'initiatives'>) => {
    const newEngagement: Engagement = {
      icon: RiLeafLine,
      title: "Nouvel engagement",
      description: "Description de l'engagement",
      progress: 0
    };
    
    setRseData({
      ...rseData,
      [section]: {
        ...rseData[section],
        data: [...rseData[section].data, newEngagement]
      }
    });
  };

  const updateEngagement = (section: keyof Omit<RSEData, 'initiatives'>, index: number, updates: Partial<Engagement | Stat>) => {
    const newData = [...rseData[section].data];
    newData[index] = { ...newData[index], ...updates };
    
    setRseData({
      ...rseData,
      [section]: { ...rseData[section], data: newData }
    });
  };

  const deleteEngagement = (section: keyof Omit<RSEData, 'initiatives'>, index: number) => {
    setRseData({
      ...rseData,
      [section]: {
        ...rseData[section],
        data: rseData[section].data.filter((_, i) => i !== index)
      }
    });
  };

  // Helper function pour vérifier le type d'engagement
  const isEngagement = (item: Engagement | Stat): item is Engagement => {
    return (item as Engagement).progress !== undefined;
  };

  const isStat = (item: Engagement | Stat): item is Stat => {
    return (item as Stat).label !== undefined;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-6">
            <div className="text-center max-w-4xl mx-auto">
              {isEditing ? (
                <Input
                  value="RSE & Durabilité"
                  onChange={() => {}}
                  className="text-center text-lg font-medium mb-4"
                />
              ) : (
                <Badge className="bg-green-100 text-green-800 border-green-200 mb-4">
                  RSE & Durabilité
                </Badge>
              )}
              
              {isEditing ? (
                <Input
                  value="L'Oréal pour le Futur"
                  onChange={() => {}}
                  className="text-4xl font-bold text-center mb-4"
                />
              ) : (
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  L'Oréal pour le Futur
                </h1>
              )}
              
              {isEditing ? (
                <Textarea
                  value="Notre engagement pour une beauté responsable qui fait avancer le monde"
                  onChange={() => {}}
                  className="text-xl text-center"
                />
              ) : (
                <p className="text-xl text-gray-600">
                  Notre engagement pour une beauté responsable qui fait avancer le monde
                </p>
              )}
            </div>
            <Button 
              variant={isEditing ? "default" : "outline"}
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2"
            >
              <RiEditLine className="h-4 w-4" />
              {isEditing ? 'Terminer édition' : 'Mode édition'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-12">
          {/* Sections RSE */}
          <EditableRSESection
            sectionKey="lorealPourLeFutur"
            section={rseData.lorealPourLeFutur}
            isEditing={isEditing}
            onEdit={setEditingSection}
            onUpdate={updateSection}
            onAddEngagement={addEngagement}
            onUpdateEngagement={updateEngagement}
            onDeleteEngagement={deleteEngagement}
            isEngagement={isEngagement}
            isStat={isStat}
          />

          <EditableRSESection
            sectionKey="lorealPourLaJeunesse"
            section={rseData.lorealPourLaJeunesse}
            isEditing={isEditing}
            onEdit={setEditingSection}
            onUpdate={updateSection}
            onAddEngagement={addEngagement}
            onUpdateEngagement={updateEngagement}
            onDeleteEngagement={deleteEngagement}
            isEngagement={isEngagement}
            isStat={isStat}
          />

          <EditableRSESection
            sectionKey="lorealEnFrance"
            section={rseData.lorealEnFrance}
            isEditing={isEditing}
            onEdit={setEditingSection}
            onUpdate={updateSection}
            onAddEngagement={addEngagement}
            onUpdateEngagement={updateEngagement}
            onDeleteEngagement={deleteEngagement}
            isEngagement={isEngagement}
            isStat={isStat}
          />

          {/* Initiatives */}
          <Card>
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Nos Initiatives Clés</h2>
                {isEditing && (
                  <Button onClick={addInitiative} variant="outline" size="sm">
                    <RiAddLine className="h-4 w-4 mr-2" />
                    Ajouter une initiative
                  </Button>
                )}
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {rseData.initiatives.map((initiative, index) => (
                  <EditableInitiativeCard
                    key={index}
                    initiative={initiative}
                    index={index}
                    isEditing={isEditing}
                    onEdit={setEditingInitiative}
                    onUpdate={updateInitiative}
                    onDelete={deleteInitiative}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Rejoignez notre engagement
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Découvrez comment vous pouvez contribuer à notre mission de création 
                d'une beauté responsable et durable pour les générations futures.
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="bg-green-600 hover:bg-green-700">
                  Voir nos offres RSE
                </Button>
                <Button variant="outline" className="border-green-600 text-green-600">
                  Télécharger le rapport RSE
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Dialogs */}
      <Dialog open={!!editingSection} onOpenChange={(open) => !open && setEditingSection(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier la section</DialogTitle>
          </DialogHeader>
          {editingSection && (
            <SectionForm
              section={rseData[editingSection]}
              onSubmit={(updates:any) => updateSection(editingSection, updates)}
              onCancel={() => setEditingSection(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={editingInitiative !== null} onOpenChange={(open) => !open && setEditingInitiative(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier l'initiative</DialogTitle>
          </DialogHeader>
          {editingInitiative !== null && (
            <InitiativeForm
              initiative={rseData.initiatives[editingInitiative]}
              onSubmit={(updates:any) => updateInitiative(editingInitiative, updates)}
              onCancel={() => setEditingInitiative(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Composant de section RSE éditable avec typage corrigé
function EditableRSESection({ 
  sectionKey, 
  section, 
  isEditing, 
  onEdit, 
  onUpdate, 
  onAddEngagement,
  onUpdateEngagement,
  onDeleteEngagement,
  isEngagement,
  isStat
}: { 
  sectionKey: keyof Omit<RSEData, 'initiatives'>;
  section: RSESection;
  isEditing: boolean;
  onEdit: (section: keyof Omit<RSEData, 'initiatives'>) => void;
  onUpdate: (section: keyof Omit<RSEData, 'initiatives'>, updates: Partial<RSESection>) => void;
  onAddEngagement: (section: keyof Omit<RSEData, 'initiatives'>) => void;
  onUpdateEngagement: (section: keyof Omit<RSEData, 'initiatives'>, index: number, updates: Partial<Engagement | Stat>) => void;
  onDeleteEngagement: (section: keyof Omit<RSEData, 'initiatives'>, index: number) => void;
  isEngagement: (item: Engagement | Stat) => item is Engagement;
  isStat: (item: Engagement | Stat) => item is Stat;
}) {
  return (
    <Card>
      <CardContent className="p-8">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            {isEditing ? (
              <div className="flex-1 space-y-4">
                <Input
                  value={section.title}
                  onChange={(e) => onUpdate(sectionKey, { title: e.target.value })}
                  className="text-2xl font-bold"
                />
                <Input
                  value={section.description}
                  onChange={(e) => onUpdate(sectionKey, { description: e.target.value })}
                />
                <Textarea
                  value={section.fullDescription}
                  onChange={(e) => onUpdate(sectionKey, { fullDescription: e.target.value })}
                  rows={4}
                />
              </div>
            ) : (
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{section.title}</h2>
                <p className="text-gray-600 text-lg mb-4">{section.description}</p>
                <div className="prose prose-lg max-w-none">
                  {section.fullDescription.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
            
            {isEditing && (
              <div className="flex gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(sectionKey)}
                  className="text-blue-600"
                >
                  <RiEditLine className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAddEngagement(sectionKey)}
                >
                  <RiAddLine className="h-4 w-4 mr-2" />
                  Ajouter
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Engagements/Stats Grid */}
        {section.type === 'engagements' && (
          <div className="grid md:grid-cols-2 gap-6">
            {section.data.map((item, index) => (
              <EditableEngagementCard
                key={index}
                engagement={item as Engagement}
                isEditing={isEditing}
                onUpdate={(updates) => onUpdateEngagement(sectionKey, index, updates)}
                onDelete={() => onDeleteEngagement(sectionKey, index)}
              />
            ))}
          </div>
        )}

        {section.type === 'jeunesse' && (
          <div className="grid md:grid-cols-3 gap-6">
            {section.data.map((item, index) => (
              <EditableStatCard
                key={index}
                engagement={item as Engagement}
                isEditing={isEditing}
                onUpdate={(updates) => onUpdateEngagement(sectionKey, index, updates)}
                onDelete={() => onDeleteEngagement(sectionKey, index)}
              />
            ))}
          </div>
        )}

        {section.type === 'france' && (
          <div className="grid md:grid-cols-3 gap-6">
            {section.data.map((item, index) => (
              <EditableStatCard
                key={index}
                engagement={item as Stat}
                isEditing={isEditing}
                onUpdate={(updates) => onUpdateEngagement(sectionKey, index, updates)}
                onDelete={() => onDeleteEngagement(sectionKey, index)}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-between items-center mt-6 pt-6 border-t">
          {isEditing && (
            <Button
              variant="outline"
              onClick={() => onAddEngagement(sectionKey)}
            >
              <RiAddLine className="h-4 w-4 mr-2" />
              Ajouter un élément
            </Button>
          )}
          <Button variant="outline" className="flex items-center gap-2 ml-auto">
            Découvrez-en plus
            <RiArrowRightLine className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Composants pour les cartes éditable avec typage corrigé
function EditableEngagementCard({ engagement, isEditing, onUpdate, onDelete }: {
  engagement: Engagement;
  isEditing: boolean;
  onUpdate: (updates: Partial<Engagement>) => void;
  onDelete: () => void;
}) {
  const IconComponent = engagement.icon;

  return (
    <Card className="bg-gray-50 border-0">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-white p-3 rounded-lg flex-shrink-0">
            <IconComponent className="h-6 w-6 text-green-600" />
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={engagement.title}
                  onChange={(e) => onUpdate({ title: e.target.value })}
                />
                <Input
                  value={engagement.description}
                  onChange={(e) => onUpdate({ description: e.target.value })}
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm">Progression:</span>
                  <Input
                    type="number"
                    value={engagement.progress}
                    onChange={(e) => onUpdate({ progress: parseInt(e.target.value) || 0 })}
                    className="w-20"
                  />
                  <span>%</span>
                </div>
                <Button variant="destructive" size="sm" onClick={onDelete}>
                  <RiDeleteBinLine className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <h3 className="font-semibold mb-2">{engagement.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{engagement.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression</span>
                    <span>{engagement.progress}%</span>
                  </div>
                  <Progress value={engagement.progress} className="h-2" />
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EditableStatCard({ engagement, isEditing, onUpdate, onDelete }: {
  engagement: Engagement | Stat;
  isEditing: boolean;
  onUpdate: (updates: Partial<Engagement | Stat>) => void;
  onDelete: () => void;
}) {
  const IconComponent = engagement.icon;
  const isEngagementItem = (engagement as Engagement).progress !== undefined;
  const isStatItem = (engagement as Stat).label !== undefined;

  return (
    <Card className="text-center border-0 bg-white shadow-sm">
      <CardContent className="p-6">
        <IconComponent className="h-8 w-8 text-blue-600 mx-auto mb-4" />
        
        {isEditing ? (
          <div className="space-y-3">
            <Input
              value={engagement.value || ''}
              onChange={(e) => onUpdate({ value: e.target.value })}
              className="text-2xl font-bold text-center"
            />
            <Input
              value={isEngagementItem ? (engagement as Engagement).title : (engagement as Stat).label}
              onChange={(e) => onUpdate(isEngagementItem ? { title: e.target.value } : { label: e.target.value })}
              className="text-center"
            />
            <Input
              value={engagement.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
            />
            <Button variant="destructive" size="sm" onClick={onDelete}>
              <RiDeleteBinLine className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {engagement.value}
            </div>
            <h3 className="font-semibold mb-2">
              {isEngagementItem ? (engagement as Engagement).title : (engagement as Stat).label}
            </h3>
            <p className="text-gray-600 text-sm">{engagement.description}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Les autres composants restent inchangés...
function EditableInitiativeCard({ initiative, index, isEditing, onEdit, onUpdate, onDelete }: any) {
  const IconComponent = initiative.icon;

  return (
    <div className="text-center relative">
      {isEditing && (
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(index)}
            className="h-6 w-6 text-blue-600"
          >
            <RiEditLine className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(index)}
            className="h-6 w-6 text-red-600"
          >
            <RiDeleteBinLine className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <IconComponent className="h-8 w-8 text-blue-600" />
      </div>
      
      {isEditing ? (
        <div className="space-y-2">
          <Input
            value={initiative.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="text-center font-semibold"
          />
          <Input
            value={initiative.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            className="text-center text-sm"
          />
          <Input
            value={initiative.impact}
            onChange={(e) => onUpdate({ impact: e.target.value })}
            className="text-center"
          />
        </div>
      ) : (
        <>
          <h3 className="font-semibold mb-2">{initiative.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{initiative.description}</p>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            {initiative.impact}
          </Badge>
        </>
      )}
    </div>
  );
}

// Formulaires pour l'édition détaillée
function SectionForm({ section, onSubmit, onCancel }: any) {
  const [formData, setFormData] = useState(section);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Titre</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Description courte</label>
        <Input
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Description complète</label>
        <Textarea
          value={formData.fullDescription}
          onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
          rows={6}
        />
      </div>
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">Sauvegarder</Button>
      </div>
    </form>
  );
}

function InitiativeForm({ initiative, onSubmit, onCancel }: any) {
  const [formData, setFormData] = useState(initiative);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Titre</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Description</label>
        <Input
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Impact</label>
        <Input
          value={formData.impact}
          onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
        />
      </div>
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">Sauvegarder</Button>
      </div>
    </form>
  );
}