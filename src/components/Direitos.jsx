import { useState } from 'react';

import {
  Scale,
  Briefcase,
  Users,
  Building,
  Heart,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Shield,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';

import { useStore } from '../store';

const rightsSections = [
  {
    id: 'trabalho',
    icon: Briefcase,
    titleKey: 'rightsWorkTitle',
    color: 'bg-[#FFCBA4]',
    items: [
      {
        titleKey: 'rightsMaternityLeaveTitle',
        descriptionKey: 'rightsMaternityLeaveDescription',
        sourceKey: 'rightsMaternityLeaveSource',
      },
      {
        titleKey: 'rightsBreastfeedingBreaksTitle',
        descriptionKey: 'rightsBreastfeedingBreaksDescription',
        sourceKey: 'rightsBreastfeedingBreaksSource',
      },
      {
        titleKey: 'rightsJobStabilityTitle',
        descriptionKey: 'rightsJobStabilityDescription',
        sourceKey: 'rightsJobStabilitySource',
      },
      {
        titleKey: 'rightsNursingRoomTitle',
        descriptionKey: 'rightsNursingRoomDescription',
        sourceKey: 'rightsNursingRoomSource',
      },
      {
        titleKey: 'rightsUnhealthyWorkTitle',
        descriptionKey: 'rightsUnhealthyWorkDescription',
        sourceKey: 'rightsUnhealthyWorkSource',
      },
    ],
  },
  {
    id: 'prioridade',
    icon: Users,
    titleKey: 'rightsPriorityTitle',
    color: 'bg-[#DCD0FF]',
    items: [
      {
        titleKey: 'rightsPriorityQueueTitle',
        descriptionKey: 'rightsPriorityQueueDescription',
        sourceKey: 'rightsPriorityQueueSource',
      },
      {
        titleKey: 'rightsPrioritySeatsTitle',
        descriptionKey: 'rightsPrioritySeatsDescription',
        sourceKey: 'rightsPrioritySeatsSource',
      },
      {
        titleKey: 'rightsPenaltiesTitle',
        descriptionKey: 'rightsPenaltiesDescription',
        sourceKey: 'rightsPenaltiesSource',
      },
    ],
  },
  {
    id: 'inss',
    icon: Building,
    titleKey: 'rightsInssTitle',
    color: 'bg-[#B8A9C9]',
    items: [
      {
        titleKey: 'rightsMaternityBenefitTitle',
        descriptionKey: 'rightsMaternityBenefitDescription',
        sourceKey: 'rightsMaternityBenefitSource',
      },
      {
        titleKey: 'rightsEligibilityTitle',
        descriptionKey: 'rightsEligibilityDescription',
        sourceKey: 'rightsEligibilitySource',
      },
      {
        titleKey: 'rightsHowToApplyTitle',
        descriptionKey: 'rightsHowToApplyDescription',
        sourceKey: 'rightsHowToApplySource',
      },
    ],
  },
  {
    id: 'publico',
    icon: Heart,
    titleKey: 'rightsPublicBreastfeedingTitle',
    color: 'bg-pink-400',
    items: [
      {
        titleKey: 'rightsGuaranteedTitle',
        descriptionKey: 'rightsGuaranteedDescription',
        sourceKey: 'rightsGuaranteedSource',
      },
      {
        titleKey: 'rightsLegalProtectionTitle',
        descriptionKey: 'rightsLegalProtectionDescription',
        sourceKey: 'rightsLegalProtectionSource',
      },
      {
        titleKey: 'rightsReportTitle',
        descriptionKey: 'rightsReportDescription',
        sourceKey: 'rightsReportSource',
      },
    ],
  },
  {
    id: 'outros',
    icon: Shield,
    titleKey: 'rightsOtherTitle',
    color: 'bg-teal-400',
    items: [
      {
        titleKey: 'rightsBirthCompanionTitle',
        descriptionKey: 'rightsBirthCompanionDescription',
        sourceKey: 'rightsBirthCompanionSource',
      },
      {
        titleKey: 'rightsRoomingInTitle',
        descriptionKey: 'rightsRoomingInDescription',
        sourceKey: 'rightsRoomingInSource',
      },
      {
        titleKey: 'rightsAppointmentsTitle',
        descriptionKey: 'rightsAppointmentsDescription',
        sourceKey: 'rightsAppointmentsSource',
      },
    ],
  },
  {
    id: 'faq',
    icon: HelpCircle,
    titleKey: 'faq',
    color: 'bg-amber-400',
    items: [
      {
        titleKey: 'rightsFaqDismissalTitle',
        descriptionKey: 'rightsFaqDismissalDescription',
        sourceKey: 'rightsFaqDismissalSource',
      },
      {
        titleKey: 'rightsFaqBreaksTitle',
        descriptionKey: 'rightsFaqBreaksDescription',
        sourceKey: 'rightsFaqBreaksSource',
      },
      {
        titleKey: 'rightsFaqPublicTitle',
        descriptionKey: 'rightsFaqPublicDescription',
        sourceKey: 'rightsFaqPublicSource',
      },
      {
        titleKey: 'rightsFaqUnemployedTitle',
        descriptionKey: 'rightsFaqUnemployedDescription',
        sourceKey: 'rightsFaqUnemployedSource',
      },
    ],
  },
];

export default function Direitos() {
  const t = useStore((state) => state.t);

  const [expandedSection, setExpandedSection] = useState(null);

  function toggleSection(id) {
    setExpandedSection((currentSection) =>
      currentSection === id ? null : id
    );
  }

  return (
    <div className="space-y-4 p-4">
      <div className="mb-2 flex items-center gap-2">
        <Scale className="h-6 w-6 text-[#B8A9C9]" />

        <h2 className="text-xl font-bold text-gray-800">
          {t('rightsTitle')}
        </h2>
      </div>

      <p className="rounded-xl bg-gradient-to-r from-[#FFDAB9]/20 to-[#E6E6FA]/20 p-4 text-base text-gray-500">
        {t('rightsIntro')}
      </p>

      <div className="space-y-3">
        {rightsSections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;

          return (
            <div
              key={section.id}
              className="overflow-hidden rounded-2xl border border-[#E6E6FA]/30 bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-gray-50"
                aria-expanded={isExpanded}
              >
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${section.color}`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-800">
                    {t(section.titleKey)}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {section.items.length} {t('items')}
                  </p>
                </div>

                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {isExpanded && (
                <div className="space-y-3 px-4 pb-4">
                  {section.items.map((item) => (
                    <div
                      key={item.titleKey}
                      className="rounded-xl border-l-4 border-[#DCD0FF] bg-gradient-to-r from-[#F5F0FF]/50 to-[#FFF5EE]/50 p-4"
                    >
                      <div className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#B8A9C9]" />

                        <div className="flex-1">
                          <h4 className="text-base font-semibold text-gray-800">
                            {t(item.titleKey)}
                          </h4>

                          <p className="mt-1 text-base text-gray-600">
                            {t(item.descriptionKey)}
                          </p>

                          <p className="mt-2 text-sm italic text-gray-400">
                            {t('source')}: {t(item.sourceKey)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl bg-gradient-to-r from-[#FFCBA4]/30 to-[#DCD0FF]/30 p-4">
        <div className="mb-2 flex items-center gap-2">
          <ExternalLink className="h-5 w-5 text-[#B8A9C9]" />

          <h3 className="text-base font-semibold text-gray-700">
            {t('rightsNeedHelpTitle')}
          </h3>
        </div>

        <p className="text-base text-gray-600">
          {t('rightsNeedHelpDescription')}
        </p>
      </div>
    </div>
  );
}
