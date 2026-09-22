import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const translations = {
  pt: {
    home: 'Início',
    map: 'Mapa',
    library: 'Biblioteca',
    pumping: 'Ordenha',
    diary: 'Diário',
    pumpingDiary: 'Diário de Ordenha',
    tasks: 'Tarefas',
    rights: 'Direitos',
    guest: 'Visitante',
    logout: 'Sair',
    welcome: 'Olá',
    lastPumping: 'Última ordenha',
    nextPumping: 'Próxima ordenha estimada',
    quickAccess: 'Acesso Rápido',
    emergencyBtn: 'Emergência',
    emergency: 'Emergência',
    nearbyPlaces: 'Locais Próximos',
    hospitals: 'Hospitais',
    milkBanks: 'Bancos de Leite',
    healthCenters: 'UBS',
    viewOnMap: 'Ver no Mapa',
    categories: 'Categorias',
    allCategories: 'Todas',
    motherCare: 'Cuidados com a Mãe',
    babyCare: 'Cuidados com o Bebê',
    breastfeeding: 'Amamentação',
    mentalHealth: 'Saúde Mental',
    search: 'Buscar...',
    article: 'Artigo',
    video: 'Vídeo',
    toDo: 'A Fazer',
    inProgress: 'Em Andamento',
    done: 'Concluído',
    addTask: 'Adicionar Tarefa',
    taskTitle: 'Título da tarefa',
    taskCategory: 'Categoria',
    taskDate: 'Data',
    baby: 'Bebê',
    mother: 'Mãe',
    save: 'Salvar',
    cancel: 'Cancelar',
    close: 'Fechar',
    pumpingRecord: 'Registro de Ordenha',
    dateTime: 'Data e Hora',
    duration: 'Duração (min)',
    quantity: 'Quantidade (ml)',
    milliliters: 'ml',
    whichBreast: 'Qual mama',
    left: 'Esquerda',
    right: 'Direita',
    both: 'Ambas',
    notes: 'Observações',
    notesPlaceholder: 'Observações...',
    register: 'Registrar',
    history: 'Histórico',
    frequency: 'Frequência (últimos 7 dias)',
    emergencyNumbers: 'Números de Emergência',
    call: 'Ligar',
    login: 'Entrar',
    signup: 'Cadastrar',
    email: 'E-mail',
    password: 'Senha',
    name: 'Nome',
    enterAsGuest: 'Entrar como Visitante',
    createAccount: 'Criar Conta',
    alreadyHaveAccount: 'Já tem conta?',
    dontHaveAccount: 'Não tem conta?',
    ago: 'atrás',
    in: 'em',
    now: 'Agora!',
    hours: 'h',
    minutes: 'min',
    noRecords: 'Nenhum registro ainda',
    optional: 'opcional',
    rightsTitle: 'Direitos da Lactante',
    workRights: 'Direitos Trabalhistas (CLT)',
    priorityService: 'Atendimento Prioritário',
    inssRights: 'Benefícios INSS',
    publicNursing: 'Amamentação em Público',
    otherRights: 'Outros Direitos',
    faq: 'Perguntas Frequentes',
    smartCare: 'Cuidados Inteligentes',
    returnToWork: 'Retorno ao Trabalho',
    profile: 'Perfil',
    editProfile: 'Editar perfil',
    editRoutine: 'Alterar rotina',
    personalizedRoutine: 'Rotina personalizada',
    suggestions: 'Sugestões para você',
    goToDashboard: 'Ir para meu painel',
    feedback: 'Feedback',
    support: 'Suporte',
    help: 'Ajuda',
    historyPage: 'Nossa história',
    profilePhotoOf: 'Foto de',
    avatarOf: 'Avatar de',

    breastfeedingSupport: 'Apoio à amamentação com carinho',
    enterYourName: 'Por favor, insira seu nome',
    fillAllFields: 'Por favor, preencha todos os campos',

    onboardingHeaderTitle: 'Vamos organizar sua rotina?',
    onboardingHeaderDescription:
      'Responda algumas perguntas rápidas para deixar o aplicativo mais útil para você. Todas as áreas continuarão disponíveis.',
    step: 'Etapa',
    of: 'de',
    back: 'Voltar',
        continue: 'Continuar',
    viewSuggestions: 'Ver minhas sugestões',
    cancelChange: 'Cancelar alteração',
    skipForNow: 'Pular por enquanto',

   privacyConsentTitle: 'Privacidade e uso dos dados',

privacyConsentDescription:
  'Antes de começar, leia como o AMARternar+ utiliza as informações inseridas por você.',

privacyConsentCheckbox:
  'Li a Política de Privacidade e estou ciente de que o AMARternar+ pode armazenar localmente neste dispositivo dados de perfil, rotina, tarefas e registros inseridos por mim, exclusivamente para personalizar e organizar minha experiência no aplicativo.',

privacyConsentNotice:
  'Você pode apagar os dados locais ou revogar esse aceite a qualquer momento em Perfil → Privacidade e dados.',

startUsingApp: 'Começar a usar o AMARternar+',

privacyAndData: 'Privacidade e dados',

privacyAndDataDescription:
  'Consulte como suas informações são usadas, verifique o aceite de privacidade e controle os dados salvos neste dispositivo.',

viewPrivacy: 'Ver privacidade e dados',

    onboardingWorkTitle: 'Como está sua rotina de trabalho hoje?',
    onboardingWorkSubtitle: 'Escolha a opção que mais combina com você.',
    workClt: 'Trabalho com carteira assinada',
    workAutonomous: 'Trabalho por conta própria',
    workInformal: 'Trabalho sem horário fixo',
    workStudent: 'Estou estudando',
    workNotWorking: 'Não estou trabalhando no momento',
    preferNotToSay: 'Prefiro não informar',

    onboardingScheduleTitle: 'Como costuma ser seu horário?',
    onboardingScheduleSubtitle:
      'Isso ajuda a organizar sugestões para sua rotina.',
    scheduleFixedDay: 'Horário fixo durante o dia',
    scheduleMorning: 'Turno da manhã',
    scheduleAfternoon: 'Turno da tarde',
    scheduleNight: 'Turno da noite',
    scheduleTwelveByThirtySix: 'Escala 12x36',
    scheduleVariable: 'Horários variáveis',
    scheduleHome: 'Trabalho ou estudo em casa',
    scheduleOther: 'Outro ou não sei',

    onboardingBabyCareTitle:
      'Enquanto você trabalha ou estuda, quem cuida do bebê?',
    onboardingBabyCareSubtitle:
      'Você poderá mudar essa informação depois.',
    babyCareDaycare: 'O bebê vai para a creche',
    babyCareFamily: 'O bebê fica com familiar',
    babyCareCaregiver: 'O bebê fica com cuidador(a)',
    babyCareWithMe: 'O bebê fica comigo',
    babyCareOrganizing: 'Ainda estou organizando',

    onboardingPriorityTitle:
      'O que você mais precisa organizar agora?',
    onboardingPrioritySubtitle:
      'Vamos destacar os recursos mais úteis para você.',
    priorityReturnToWork: 'Retorno ao trabalho ou estudo',
    priorityPumping: 'Ordenha e armazenamento',
    priorityRights: 'Meus direitos como lactante',
    priorityTasks: 'Minha rotina e tarefas da semana',
    priorityMap: 'Encontrar apoio perto de mim',
    priorityCare: 'Cuidados comigo e com o bebê',

    onboardingTutorialTitle:
      'Quer receber dicas de como usar o aplicativo?',
    onboardingTutorialSubtitle:
      'Você poderá ativar ou desativar isso depois.',
    tutorialYes: 'Sim, quero explicações simples',
    tutorialNo: 'Não, consigo usar por conta própria',

    myProfile: 'Meu Perfil',
    profileIntro:
      'Ajuste suas informações para deixar o aplicativo mais útil para a sua rotina.',
    profilePhoto: 'Foto de perfil',
    profileAvatar: 'Avatar de perfil',
    preferredNameQuestion: 'Como você prefere ser chamada?',
    preferredName: 'Nome de preferência',
    preferredNameExample: 'Exemplo: Maria',
    preferredNameHelp: 'Use seu primeiro nome ou um apelido, se preferir.',
    chooseAvatar: 'Escolha um avatar',
    chooseAvatarHelp:
      'Se não quiser usar uma foto, escolha um avatar para aparecer no seu perfil.',
    chooseAvatarAction: 'Escolher avatar',
    profilePhotoHelp:
      'Se preferir, você pode enviar uma foto. Ela ficará salva somente neste dispositivo.',
    chooseProfilePhoto: 'Escolher foto de perfil',
    acceptedImageFormats:
      'Formatos aceitos: JPG, PNG ou WEBP. Tamanho máximo: 1 MB.',
    removePhoto: 'Remover foto',
    invalidImageFormat:
      'Escolha uma imagem no formato JPG, PNG ou WEBP.',
    imageTooLarge: 'Escolha uma foto de até 1 MB.',
    couldNotSavePhoto:
      'Não foi possível salvar a foto. Tente escolher uma imagem menor.',
    profileUpdated: 'Perfil atualizado com sucesso!',
    userFallbackName: 'Usuária',

    myRoutine: 'Minha rotina',
    myRoutineHelp:
      'Estas informações ajudam o AMARternar+ a destacar recursos úteis para você.',
    routineWorkOrStudy: 'Trabalho ou estudo',
    routineSchedule: 'Horário ou escala',
    routineBabyCare: 'Cuidados com o bebê',
    routineCurrentPriority: 'Prioridade atual',
    noRoutineDetails:
      'Você ainda não informou detalhes da sua rotina.',
    adjustRoutine: 'Ajustar minha rotina',
    saveChanges: 'Salvar alterações',
    dataStaysOnDevice: 'Suas informações ficam neste dispositivo',
    dataStaysOnDeviceDescription:
      'O aplicativo usa suas respostas apenas para organizar destaques e sugestões. Você pode alterar essas informações quando quiser.',

    kanban: 'Kanban',
    noTasks: 'Nenhuma tarefa',
    taskTitleExample: 'Ex: Consulta pediatra',
    moveTaskBack: 'Mover tarefa para a coluna anterior',
    moveTaskForward: 'Mover tarefa para a próxima coluna',
    deleteTask: 'Excluir tarefa',

    accessContent: 'Acessar conteúdo',
    noContentFound: 'Nenhum conteúdo encontrado',
    librarySourceHealthMinistry: 'Ministério da Saúde',
    librarySourceFiocruzYouTube: 'YouTube - Fiocruz',
    librarySourceCvv: 'CVV',
    librarySourcePediatricsYouTube: 'YouTube - Aula Pediatria',
    librarySourcePahoWho: 'OPAS/OMS',
    librarySourceBrazilianPediatrics:
      'Sociedade Brasileira de Pediatria',
    librarySourceWhoUnicefYouTube: 'YouTube - OMS/UNICEF',
    librarySourceFiocruz: 'Fiocruz',
    librarySourceGovBr: 'Gov.br',
    librarySourceSpecialistYouTube: 'YouTube - Especialista',

    libraryContent1Title: 'Amamentação - Guia Completo',
    libraryContent1Description:
      'Página oficial com todas as informações sobre amamentação.',
    libraryContent2Title: 'Saúde da Criança',
    libraryContent2Description:
      'Informações sobre cuidados com a saúde do bebê.',
    libraryContent3Title: 'Como ordenhar e doar leite materno',
    libraryContent3Description:
      'Vídeo oficial ensinando a técnica correta de ordenha.',
    libraryContent4Title: 'Cadernetas e Cartões da Gestante',
    libraryContent4Description:
      'Acesse a caderneta da gestante e outros materiais oficiais.',
    libraryContent5Title: 'CVV - Apoio Emocional 24h',
    libraryContent5Description:
      'Centro de Valorização da Vida - Ligue 188 ou acesse o chat.',
    libraryContent6Title: 'Cuidados com o Recém-Nascido',
    libraryContent6Description:
      'Aula completa sobre cuidados com o recém-nascido.',
    libraryContent7Title: 'Aleitamento Materno - OMS',
    libraryContent7Description:
      'Importância do aleitamento materno segundo a OMS.',
    libraryContent8Title: 'Pediatria para Famílias',
    libraryContent8Description:
      'Portal com orientações para pais sobre saúde infantil.',
    libraryContent9Title: 'Saúde Mental - Informações',
    libraryContent9Description:
      'Informações sobre depressão pós-parto e saúde mental.',
    libraryContent10Title: 'Hospital Amigo da Criança',
    libraryContent10Description:
      'Os 10 passos para o sucesso do aleitamento materno.',
    libraryContent11Title: 'Rede de Bancos de Leite Humano',
    libraryContent11Description:
      'Encontre bancos de leite humano e saiba como doar.',
    libraryContent12Title: 'Salário-Maternidade - INSS',
    libraryContent12Description:
      'Informações sobre salário-maternidade e como solicitar.',
    libraryContent13Title: 'Direitos das Trabalhadoras Gestantes',
    libraryContent13Description:
      'Licença, estabilidade, consultas e intervalos para amamentação.',
    libraryContent14Title: 'Leite Materno: Ordenha e Armazenamento',
    libraryContent14Description:
      'Como ordenhar, armazenar e descongelar leite materno.',

    all: 'Todos',
    hospitalMaternity: 'Hospital/Maternidade',
    milkBank: 'Banco de Leite',
    healthCenter: 'UBS',
    gettingLocation: 'Obtendo sua localização...',
    locationUnavailable: 'Localização não disponível',
    locationPermissionError:
      'Não foi possível obter sua localização. Por favor, permita o acesso à localização no navegador.',
    geolocationNotSupported:
      'Seu navegador não suporta geolocalização.',
    tryAgain: 'Tentar novamente',
    yourLocation: 'Sua localização',
    locationObtained: 'Localização obtida com sucesso!',
    openMyLocation: 'Abrir minha localização no mapa',
    openGoogleMaps: 'Toque para abrir o Google Maps',
    withCurrentLocation: 'com sua localização atual',
    searchByType: 'Buscar por tipo:',
    findNearestLocation: 'Encontre o mais próximo de você',
    searchOnMap: 'Buscar no Mapa',
    tip: 'Dica',
    mapTipDescription:
      'Ao clicar em "Buscar no Mapa", o Google Maps abrirá com os locais mais próximos de você. Você pode ligar diretamente ou traçar uma rota.',

    items: 'itens',
    source: 'Fonte',
    rightsIntro:
      'Conheça seus direitos como gestante e lactante. Informações baseadas na legislação brasileira vigente.',
    rightsNeedHelpTitle: 'Precisa de ajuda?',
    rightsNeedHelpDescription:
      'Em caso de violação dos seus direitos, procure o sindicato da sua categoria, o Ministério do Trabalho ou a Defensoria Pública.',

    rightsWorkTitle: 'Direitos Trabalhistas (CLT)',
    rightsMaternityLeaveTitle: 'Licença-Maternidade',
    rightsMaternityLeaveDescription:
      '120 dias garantidos pela Constituição Federal. Empresas do Programa Empresa Cidadã: 180 dias.',
    rightsMaternityLeaveSource:
      'CF Art. 7º, XVIII | Lei 11.770/2008',

    rightsBreastfeedingBreaksTitle: 'Intervalos para Amamentação',
    rightsBreastfeedingBreaksDescription:
      'Dois descansos especiais de 30 minutos cada durante a jornada, até o bebê completar 6 meses.',
    rightsBreastfeedingBreaksSource: 'Art. 396 CLT',

    rightsJobStabilityTitle: 'Estabilidade no Emprego',
    rightsJobStabilityDescription:
      'Proibida demissão sem justa causa desde a confirmação da gravidez até 5 meses após o parto.',
    rightsJobStabilitySource: 'ADCT Art. 10, II, b',

    rightsNursingRoomTitle: 'Sala de Amamentação',
    rightsNursingRoomDescription:
      'Empresas com mais de 30 funcionárias maiores de 16 anos devem ter local apropriado.',
    rightsNursingRoomSource: 'Art. 389, §1º CLT',

    rightsUnhealthyWorkTitle: 'Afastamento de Insalubridade',
    rightsUnhealthyWorkDescription:
      'Gestantes e lactantes devem ser afastadas de atividades insalubres sem redução salarial.',
    rightsUnhealthyWorkSource: 'Art. 394-A CLT',

    rightsPriorityTitle: 'Atendimento Prioritário',
    rightsPriorityQueueTitle: 'Fila Preferencial',
    rightsPriorityQueueDescription:
      'Gestantes e lactantes têm direito a atendimento prioritário em bancos, supermercados, hospitais e repartições públicas.',
    rightsPriorityQueueSource: 'Lei 10.048/2000',

    rightsPrioritySeatsTitle: 'Assentos Preferenciais',
    rightsPrioritySeatsDescription:
      'Reserva obrigatória de assentos em transporte público coletivo.',
    rightsPrioritySeatsSource: 'Lei 10.048/2000',

    rightsPenaltiesTitle: 'Penalidades',
    rightsPenaltiesDescription:
      'Estabelecimentos que descumprirem estão sujeitos a multas e penalidades administrativas.',
    rightsPenaltiesSource: 'Lei 10.048/2000, Art. 6º',

    rightsInssTitle: 'Benefícios INSS',
    rightsMaternityBenefitTitle: 'Salário-Maternidade',
    rightsMaternityBenefitDescription:
      'Benefício pago durante o período de licença. Valor corresponde à última remuneração.',
    rightsMaternityBenefitSource: 'Lei 8.213/91',

    rightsEligibilityTitle: 'Quem tem direito',
    rightsEligibilityDescription:
      'Trabalhadoras CLT, domésticas, contribuintes individuais, MEI, seguradas especiais e desempregadas em período de graça.',
    rightsEligibilitySource: 'Lei 8.213/91, Art. 71',

    rightsHowToApplyTitle: 'Como solicitar',
    rightsHowToApplyDescription:
      'Pelo aplicativo ou site Meu INSS, ou ligando para 135.',
    rightsHowToApplySource: 'Portal Meu INSS',

    rightsPublicBreastfeedingTitle: 'Amamentação em Público',
    rightsGuaranteedTitle: 'Direito Garantido',
    rightsGuaranteedDescription:
      'A amamentação é direito da mãe e do bebê e pode ser realizada em qualquer local público ou privado.',
    rightsGuaranteedSource:
      'Estatuto da Criança e do Adolescente',

    rightsLegalProtectionTitle: 'Proteção Legal',
    rightsLegalProtectionDescription:
      'É proibido constranger, impedir ou criar obstáculos à amamentação em locais públicos ou privados.',
    rightsLegalProtectionSource: 'Leis Estaduais e Municipais',

    rightsReportTitle: 'Denúncia',
    rightsReportDescription:
      'Caso sofra constrangimento, denuncie ao Procon ou procure orientação jurídica.',
    rightsReportSource: 'Código de Defesa do Consumidor',

    rightsOtherTitle: 'Outros Direitos',
    rightsBirthCompanionTitle: 'Acompanhante no Parto',
    rightsBirthCompanionDescription:
      'Direito a um acompanhante de livre escolha durante o trabalho de parto, parto e pós-parto imediato.',
    rightsBirthCompanionSource: 'Lei 11.108/2005',

    rightsRoomingInTitle: 'Alojamento Conjunto',
    rightsRoomingInDescription:
      'Mãe e bebê devem permanecer juntos 24h após o nascimento, salvo indicação médica contrária.',
    rightsRoomingInSource: 'Portaria MS 2.068/2016',

    rightsAppointmentsTitle: 'Consultas e Exames',
    rightsAppointmentsDescription:
      'Gestantes têm direito a dispensas do trabalho para consultas e exames durante a gravidez.',
    rightsAppointmentsSource: 'Art. 392, §4º CLT',

    rightsFaqDismissalTitle: 'Posso ser demitida amamentando?',
    rightsFaqDismissalDescription:
      'NÃO. Você tem estabilidade da gravidez até 5 meses após o parto. Demissão sem justa causa neste período é ilegal.',
    rightsFaqDismissalSource: 'ADCT Art. 10, II, b',

    rightsFaqBreaksTitle: 'Quantas pausas tenho no trabalho?',
    rightsFaqBreaksDescription:
      'Duas pausas de 30 minutos cada, durante a jornada de trabalho, até o bebê completar 6 meses.',
    rightsFaqBreaksSource: 'Art. 396 CLT',

    rightsFaqPublicTitle: 'Posso amamentar em público?',
    rightsFaqPublicDescription:
      'SIM! É um direito garantido. Ninguém pode impedir ou constranger você por amamentar em qualquer lugar.',
    rightsFaqPublicSource: 'ECA e Leis Locais',

    rightsFaqUnemployedTitle:
      'Tenho direito à licença mesmo desempregada?',
    rightsFaqUnemployedDescription:
      'Sim, se estiver no período de graça do INSS, até 12 meses após o último emprego, pode receber salário-maternidade.',
    rightsFaqUnemployedSource: 'Lei 8.213/91',

    careHeaderEyebrow: 'Organização simples para o dia a dia',
    careHeaderDescription:
      'Pequenos passos para deixar sua rotina de amamentação mais confortável, organizada e tranquila.',
    yourProgress: 'Seu progresso',
    careStepsCompleted: 'cuidados concluídos',
    careStep: 'Cuidado',
    markAsCompleted: 'Marcar como concluído:',
    unmark: 'Desmarcar:',
    hideTips: 'Ocultar dicas',
    viewSimpleTips: 'Ver dicas simples',

    careStep1Title: 'Separe o necessário',
    careStep1Subtitle: 'Deixe perto o que você pode precisar.',
    careStep1Tip1: 'Tenha água por perto para se hidratar.',
    careStep1Tip2: 'Separe fralda, pano limpo e itens do bebê.',
    careStep1Tip3:
      'Deixe o celular carregado, se precisar de orientação.',

    careStep2Title: 'Deixe tudo ao alcance',
    careStep2Subtitle: 'Evite se levantar durante a mamada.',
    careStep2Tip1:
      'Escolha uma cadeira, sofá ou cama confortável.',
    careStep2Tip2:
      'Apoie suas costas e, se possível, seus pés.',
    careStep2Tip3:
      'Posicione os itens importantes perto de você.',

    careStep3Title: 'Cuide da higiene',
    careStep3Subtitle: 'Pequenos cuidados ajudam na rotina.',
    careStep3Tip1: 'Lave as mãos antes de cuidar do bebê.',
    careStep3Tip2: 'Use panos limpos quando necessário.',
    careStep3Tip3:
      'Mantenha o espaço organizado e agradável.',

    careStep4Title: 'Monte sua rotina',
    careStep4Subtitle:
      'Cada dia pode ficar um pouco mais leve.',
    careStep4Tip1:
      'Observe os horários em que o bebê costuma mamar.',
    careStep4Tip2:
      'Faça pausas para descansar quando puder.',
    careStep4Tip3:
      'Peça ajuda para alguém de confiança.',

    careStep5Title: 'Mantenha o que funciona',
    careStep5Subtitle:
      'Repita os cuidados que ajudam você e o bebê.',
    careStep5Tip1: 'Use esta lista sempre que precisar.',
    careStep5Tip2:
      'Ajuste a rotina conforme suas necessidades.',
    careStep5Tip3:
      'Procure apoio profissional se tiver dor ou dificuldade.',

    careWarningTitle: 'Atenção aos sinais do seu corpo',
    careWarningDescription:
      'Dor forte, febre, vermelhidão intensa na mama ou dificuldade para o bebê mamar são sinais para procurar uma unidade de saúde ou um profissional de confiança.',

    returnHeaderEyebrow: 'Preparação com passos simples',
    returnHeaderDescription:
      'Organize sua rotina, conheça seus direitos e prepare a continuidade da amamentação de acordo com a sua realidade.',
    myPreparation: 'Minha preparação',
    returnStepsCompleted: 'passos concluídos',
    returnImportantSteps: 'Passos importantes',
    hideGuidance: 'Ocultar orientações de',
    viewGuidance: 'Ver orientações de',

    returnTask1: 'Conhecer meus direitos como lactante.',
    returnTask2: 'Conversar sobre pausas e apoio no trabalho.',
    returnTask3: 'Separar recipientes para armazenar o leite.',
    returnTask4: 'Planejar horários possíveis para ordenha.',
    returnTask5:
      'Conversar com a rede de apoio ou cuidador.',
    returnTask6:
      'Organizar a bolsa e os itens para o retorno.',

    returnStepRightsTitle: 'Conheça seus direitos',
    returnStepRightsDescription:
      'Veja informações importantes para conciliar trabalho e amamentação.',
    returnStepRightsTip1:
      'Em geral, a CLT prevê dois descansos especiais de 30 minutos para amamentar durante a jornada, até o bebê completar 6 meses.',
    returnStepRightsTip2:
      'Converse com a empresa sobre horários, pausas e possibilidades de apoio.',
    returnStepRightsTip3:
      'Em caso de dúvida, consulte os canais oficiais, RH, sindicato ou orientação jurídica.',
    returnStepRightsAction: 'Ver direitos da lactante',

    returnStepPumpingTitle: 'Prepare a ordenha',
    returnStepPumpingDescription:
      'Organize os itens e os horários para a retirada e o armazenamento do leite.',
    returnStepPumpingTip1:
      'Comece a se preparar com antecedência para conhecer a rotina que funciona para você.',
    returnStepPumpingTip2:
      'Separe recipientes adequados, identificados com data e horário da coleta.',
    returnStepPumpingTip3:
      'Use o Diário de Ordenha para acompanhar horários, duração e quantidade.',
    returnStepPumpingAction: 'Abrir Diário de Ordenha',

    returnStepRoutineTitle: 'Organize sua rotina',
    returnStepRoutineDescription:
      'Planeje o dia com apoio da família, cuidador ou rede de confiança.',
    returnStepRoutineTip1:
      'Converse com quem ficará com o bebê sobre horários e formas de oferecer o leite.',
    returnStepRoutineTip2:
      'Planeje o deslocamento e deixe os itens necessários separados no dia anterior.',
    returnStepRoutineTip3:
      'Inclua momentos possíveis de descanso, hidratação e apoio emocional.',
    returnStepRoutineAction: 'Ver cuidados inteligentes',

    returnStepPlanTitle: 'Monte seu plano semanal',
    returnStepPlanDescription:
      'Acompanhe tarefas simples para se preparar com tranquilidade.',
    returnStepPlanTip1:
      'Escolha apenas as tarefas que fazem sentido para sua realidade.',
    returnStepPlanTip2:
      'Conclua uma etapa por vez: você não precisa fazer tudo no mesmo dia.',
    returnStepPlanTip3:
      'Acompanhe o percentual de preparação na tela de Tarefas.',
    returnStepPlanAction: 'Abrir tarefas semanais',

    returnReminderTitle: 'Lembrete importante',
    returnReminderDescription:
      'Cada família tem uma rotina diferente. Use estas orientações como apoio e procure uma unidade de saúde, banco de leite humano ou profissional de confiança se precisar de orientação individual.',

    emergencyTapToCall: 'Toque em um número para ligar',
    emergencySamuDescription:
      'Serviço de Atendimento Móvel de Urgência',
    emergencyCvvDescription:
      'Apoio emocional e prevenção do suicídio',
    emergencyHealthLineName: 'Disque Saúde',
    emergencyHealthLineDescription:
      'Informações de saúde e ouvidoria do SUS',
    emergencyPoliceName: 'Polícia',
    emergencyPoliceDescription:
      'Polícia Militar - Emergências',
    emergencyFirefightersName: 'Bombeiros',
    emergencyFirefightersDescription:
      'Corpo de Bombeiros - Resgate',
  },

  en: {
    home: 'Home',
    map: 'Map',
    library: 'Library',
    pumping: 'Pumping',
    diary: 'Diary',
    pumpingDiary: 'Pumping Diary',
    tasks: 'Tasks',
    rights: 'Rights',
    guest: 'Guest',
    logout: 'Logout',
    welcome: 'Hello',
    lastPumping: 'Last pumping',
    nextPumping: 'Next estimated pumping',
    quickAccess: 'Quick Access',
    emergencyBtn: 'Emergency',
    emergency: 'Emergency',
    nearbyPlaces: 'Nearby Places',
    hospitals: 'Hospitals',
    milkBanks: 'Milk Banks',
    healthCenters: 'Health Centers',
    viewOnMap: 'View on Map',
    categories: 'Categories',
    allCategories: 'All',
    motherCare: 'Mother Care',
    babyCare: 'Baby Care',
    breastfeeding: 'Breastfeeding',
    mentalHealth: 'Mental Health',
    search: 'Search...',
    article: 'Article',
    video: 'Video',
    toDo: 'To Do',
    inProgress: 'In Progress',
    done: 'Done',
    addTask: 'Add Task',
    taskTitle: 'Task title',
    taskCategory: 'Category',
    taskDate: 'Date',
    baby: 'Baby',
    mother: 'Mother',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    pumpingRecord: 'Pumping Record',
    dateTime: 'Date and Time',
    duration: 'Duration (min)',
    quantity: 'Quantity (ml)',
    milliliters: 'ml',
    whichBreast: 'Which breast',
    left: 'Left',
    right: 'Right',
    both: 'Both',
    notes: 'Notes',
    notesPlaceholder: 'Notes...',
    register: 'Register',
    history: 'History',
    frequency: 'Frequency (last 7 days)',
    emergencyNumbers: 'Emergency Numbers',
    call: 'Call',
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    enterAsGuest: 'Enter as Guest',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    ago: 'ago',
    in: 'in',
    now: 'Now!',
    hours: 'h',
    minutes: 'min',
    noRecords: 'No records yet',
    optional: 'optional',
    rightsTitle: 'Nursing Rights',
    workRights: 'Work Rights (Labor Law)',
    priorityService: 'Priority Service',
    inssRights: 'Social Security Benefits',
    publicNursing: 'Public Nursing',
    otherRights: 'Other Rights',
    faq: 'FAQ',
    smartCare: 'Smart Care',
    returnToWork: 'Return to Work',
    profile: 'Profile',
    editProfile: 'Edit profile',
    editRoutine: 'Change routine',
    personalizedRoutine: 'Personalized routine',
    suggestions: 'Suggestions for you',
    goToDashboard: 'Go to my dashboard',
    feedback: 'Feedback',
    support: 'Support',
    help: 'Help',
    historyPage: 'Our story',
    profilePhotoOf: 'Photo of',
    avatarOf: 'Avatar of',

    breastfeedingSupport: 'Breastfeeding support with care',
    enterYourName: 'Please enter your name',
    fillAllFields: 'Please fill in all fields',

    onboardingHeaderTitle: 'Let’s organize your routine?',
    onboardingHeaderDescription:
      'Answer a few quick questions to make the app more useful for you. All areas will remain available.',
    step: 'Step',
    of: 'of',
    back: 'Back',
        continue: 'Continue',
    viewSuggestions: 'View my suggestions',
    cancelChange: 'Cancel changes',
    skipForNow: 'Skip for now',

   privacyConsentTitle: 'Privacy and data use',

privacyConsentDescription:
  'Before getting started, please read how AMARternar+ uses the information you enter.',

privacyConsentCheckbox:
  'I have read the Privacy Policy and understand that AMARternar+ may store profile, routine, task, and record data locally on this device solely to personalize and organize my app experience.',

privacyConsentNotice:
  'You can delete local data or withdraw this consent at any time in Profile → Privacy and data.',

startUsingApp: 'Start using AMARternar+',

privacyAndData: 'Privacy and data',

privacyAndDataDescription:
  'See how your information is used, check your privacy consent, and manage the data saved on this device.',

viewPrivacy: 'View privacy and data',
    onboardingWorkTitle: 'What is your work routine like today?',
    onboardingWorkSubtitle:
      'Choose the option that best describes you.',
    workClt: 'I work with a formal employment contract',
    workAutonomous: 'I am self-employed',
    workInformal: 'I work without a fixed schedule',
    workStudent: 'I am studying',
    workNotWorking: 'I am not working at the moment',
    preferNotToSay: 'I prefer not to say',

    onboardingScheduleTitle: 'What is your usual schedule?',
    onboardingScheduleSubtitle:
      'This helps organize suggestions for your routine.',
    scheduleFixedDay: 'Fixed daytime schedule',
    scheduleMorning: 'Morning shift',
    scheduleAfternoon: 'Afternoon shift',
    scheduleNight: 'Night shift',
    scheduleTwelveByThirtySix: '12x36 shift schedule',
    scheduleVariable: 'Variable schedules',
    scheduleHome: 'I work or study from home',
    scheduleOther: 'Other or I am not sure',

    onboardingBabyCareTitle:
      'While you work or study, who takes care of the baby?',
    onboardingBabyCareSubtitle:
      'You can change this information later.',
    babyCareDaycare: 'My baby goes to daycare',
    babyCareFamily: 'My baby stays with a family member',
    babyCareCaregiver: 'My baby stays with a caregiver',
    babyCareWithMe: 'My baby stays with me',
    babyCareOrganizing: 'I am still organizing this',

    onboardingPriorityTitle:
      'What do you most need to organize right now?',
    onboardingPrioritySubtitle:
      'We will highlight the most useful resources for you.',
    priorityReturnToWork: 'Returning to work or studies',
    priorityPumping: 'Pumping and storage',
    priorityRights: 'My rights as a nursing mother',
    priorityTasks: 'My routine and weekly tasks',
    priorityMap: 'Finding support near me',
    priorityCare: 'Care for me and my baby',

    onboardingTutorialTitle:
      'Would you like tips on how to use the app?',
    onboardingTutorialSubtitle:
      'You can enable or disable this later.',
    tutorialYes: 'Yes, I would like simple explanations',
    tutorialNo: 'No, I can use it on my own',

    myProfile: 'My Profile',
    profileIntro:
      'Adjust your information to make the app more useful for your routine.',
    profilePhoto: 'Profile photo',
    profileAvatar: 'Profile avatar',
    preferredNameQuestion: 'What would you like to be called?',
    preferredName: 'Preferred name',
    preferredNameExample: 'Example: Maria',
    preferredNameHelp: 'Use your first name or a nickname if you prefer.',
    chooseAvatar: 'Choose an avatar',
    chooseAvatarHelp:
      'If you do not want to use a photo, choose an avatar to appear on your profile.',
    chooseAvatarAction: 'Choose avatar',
    profilePhotoHelp:
      'If you prefer, you can upload a photo. It will be stored only on this device.',
    chooseProfilePhoto: 'Choose profile photo',
    acceptedImageFormats:
      'Accepted formats: JPG, PNG, or WEBP. Maximum size: 1 MB.',
    removePhoto: 'Remove photo',
    invalidImageFormat:
      'Choose an image in JPG, PNG, or WEBP format.',
    imageTooLarge: 'Choose a photo up to 1 MB.',
    couldNotSavePhoto:
      'The photo could not be saved. Try choosing a smaller image.',
    profileUpdated: 'Profile updated successfully!',
    userFallbackName: 'User',

    myRoutine: 'My routine',
    myRoutineHelp:
      'This information helps AMARternar+ highlight useful resources for you.',
    routineWorkOrStudy: 'Work or studies',
    routineSchedule: 'Schedule or shift',
    routineBabyCare: 'Baby care',
    routineCurrentPriority: 'Current priority',
    noRoutineDetails:
      'You have not provided details about your routine yet.',
    adjustRoutine: 'Adjust my routine',
    saveChanges: 'Save changes',
    dataStaysOnDevice: 'Your information stays on this device',
    dataStaysOnDeviceDescription:
      'The app uses your answers only to organize highlights and suggestions. You can change this information whenever you want.',

    kanban: 'Kanban',
    noTasks: 'No tasks',
    taskTitleExample: 'Example: Pediatrician appointment',
    moveTaskBack: 'Move task to the previous column',
    moveTaskForward: 'Move task to the next column',
    deleteTask: 'Delete task',

    accessContent: 'Open content',
    noContentFound: 'No content found',
    librarySourceHealthMinistry:
      'Brazilian Ministry of Health',
    librarySourceFiocruzYouTube: 'YouTube - Fiocruz',
    librarySourceCvv: 'CVV',
    librarySourcePediatricsYouTube:
      'YouTube - Pediatrics Class',
    librarySourcePahoWho: 'PAHO/WHO',
    librarySourceBrazilianPediatrics:
      'Brazilian Society of Pediatrics',
    librarySourceWhoUnicefYouTube: 'YouTube - WHO/UNICEF',
    librarySourceFiocruz: 'Fiocruz',
    librarySourceGovBr: 'Gov.br',
    librarySourceSpecialistYouTube: 'YouTube - Specialist',

    libraryContent1Title: 'Breastfeeding - Complete Guide',
    libraryContent1Description:
      'Official page with information about breastfeeding.',
    libraryContent2Title: 'Child Health',
    libraryContent2Description:
      'Information about caring for the baby’s health.',
    libraryContent3Title: 'How to pump and donate breast milk',
    libraryContent3Description:
      'Official video teaching the correct pumping technique.',
    libraryContent4Title: 'Pregnancy Booklets and Cards',
    libraryContent4Description:
      'Access the pregnancy booklet and other official materials.',
    libraryContent5Title: 'CVV - 24-hour Emotional Support',
    libraryContent5Description:
      'Life Appreciation Center - Call 188 or access the chat.',
    libraryContent6Title: 'Newborn Care',
    libraryContent6Description:
      'Complete class about newborn care.',
    libraryContent7Title: 'Breastfeeding - WHO',
    libraryContent7Description:
      'The importance of breastfeeding according to the WHO.',
    libraryContent8Title: 'Pediatrics for Families',
    libraryContent8Description:
      'Portal with guidance for parents about child health.',
    libraryContent9Title: 'Mental Health - Information',
    libraryContent9Description:
      'Information about postpartum depression and mental health.',
    libraryContent10Title: 'Baby-Friendly Hospital',
    libraryContent10Description:
      'The 10 steps to successful breastfeeding.',
    libraryContent11Title: 'Human Milk Bank Network',
    libraryContent11Description:
      'Find human milk banks and learn how to donate.',
    libraryContent12Title: 'Maternity Benefit - INSS',
    libraryContent12Description:
      'Information about maternity benefits and how to apply.',
    libraryContent13Title: 'Rights of Pregnant Workers',
    libraryContent13Description:
      'Leave, job stability, appointments, and breastfeeding breaks.',
    libraryContent14Title:
      'Breast Milk: Pumping and Storage',
    libraryContent14Description:
      'How to pump, store, and thaw breast milk.',

    all: 'All',
    hospitalMaternity: 'Hospital/Maternity',
    milkBank: 'Milk Bank',
    healthCenter: 'Health Center',
    gettingLocation: 'Getting your location...',
    locationUnavailable: 'Location unavailable',
    locationPermissionError:
      'We could not get your location. Please allow location access in your browser.',
    geolocationNotSupported:
      'Your browser does not support geolocation.',
    tryAgain: 'Try again',
    yourLocation: 'Your location',
    locationObtained: 'Location obtained successfully!',
    openMyLocation: 'Open my location on the map',
    openGoogleMaps: 'Tap to open Google Maps',
    withCurrentLocation: 'with your current location',
    searchByType: 'Search by type:',
    findNearestLocation: 'Find the nearest one to you',
    searchOnMap: 'Search on Map',
    tip: 'Tip',
    mapTipDescription:
      'When you tap "Search on Map", Google Maps will open with locations near you. You can call directly or get directions.',

    items: 'items',
    source: 'Source',
    rightsIntro:
      'Learn about your rights as a pregnant or nursing woman. Information is based on current Brazilian legislation.',
    rightsNeedHelpTitle: 'Need help?',
    rightsNeedHelpDescription:
      'If your rights are violated, contact your category union, the Ministry of Labor, or the Public Defender’s Office.',

    rightsWorkTitle: 'Employment Rights (CLT)',
    rightsMaternityLeaveTitle: 'Maternity Leave',
    rightsMaternityLeaveDescription:
      '120 days guaranteed by the Federal Constitution. Companies in the Citizen Company Program: 180 days.',
    rightsMaternityLeaveSource:
      'Federal Constitution Art. 7, XVIII | Law 11.770/2008',

    rightsBreastfeedingBreaksTitle: 'Breastfeeding Breaks',
    rightsBreastfeedingBreaksDescription:
      'Two special 30-minute breaks during the workday until the baby reaches 6 months of age.',
    rightsBreastfeedingBreaksSource: 'CLT Art. 396',

    rightsJobStabilityTitle: 'Job Stability',
    rightsJobStabilityDescription:
      'Dismissal without cause is prohibited from confirmation of pregnancy until 5 months after childbirth.',
    rightsJobStabilitySource: 'ADCT Art. 10, II, b',

    rightsNursingRoomTitle: 'Nursing Room',
    rightsNursingRoomDescription:
      'Companies with more than 30 female employees over 16 years old must provide an appropriate space.',
    rightsNursingRoomSource: 'CLT Art. 389, §1',

    rightsUnhealthyWorkTitle: 'Removal from Unhealthy Work',
    rightsUnhealthyWorkDescription:
      'Pregnant and nursing workers must be removed from unhealthy activities without salary reduction.',
    rightsUnhealthyWorkSource: 'CLT Art. 394-A',

    rightsPriorityTitle: 'Priority Service',
    rightsPriorityQueueTitle: 'Priority Queue',
    rightsPriorityQueueDescription:
      'Pregnant and nursing women have the right to priority service at banks, supermarkets, hospitals, and public offices.',
    rightsPriorityQueueSource: 'Law 10.048/2000',

    rightsPrioritySeatsTitle: 'Priority Seats',
    rightsPrioritySeatsDescription:
      'Mandatory reserved seats on public transportation.',
    rightsPrioritySeatsSource: 'Law 10.048/2000',

    rightsPenaltiesTitle: 'Penalties',
    rightsPenaltiesDescription:
      'Establishments that fail to comply may be subject to fines and administrative penalties.',
    rightsPenaltiesSource: 'Law 10.048/2000, Art. 6',

    rightsInssTitle: 'INSS Benefits',
    rightsMaternityBenefitTitle: 'Maternity Benefit',
    rightsMaternityBenefitDescription:
      'Benefit paid during the leave period. The amount corresponds to the last salary.',
    rightsMaternityBenefitSource: 'Law 8.213/91',

    rightsEligibilityTitle: 'Who is eligible',
    rightsEligibilityDescription:
      'CLT workers, domestic workers, individual contributors, MEI workers, special insured workers, and unemployed people in the grace period.',
    rightsEligibilitySource: 'Law 8.213/91, Art. 71',

    rightsHowToApplyTitle: 'How to apply',
    rightsHowToApplyDescription:
      'Use the Meu INSS app or website, or call 135.',
    rightsHowToApplySource: 'Meu INSS Portal',

    rightsPublicBreastfeedingTitle: 'Breastfeeding in Public',
    rightsGuaranteedTitle: 'Guaranteed Right',
    rightsGuaranteedDescription:
      'Breastfeeding is a right of the mother and baby and may take place in any public or private location.',
    rightsGuaranteedSource:
      'Child and Adolescent Statute',

    rightsLegalProtectionTitle: 'Legal Protection',
    rightsLegalProtectionDescription:
      'It is prohibited to embarrass, prevent, or create barriers to breastfeeding in public or private places.',
    rightsLegalProtectionSource: 'State and Municipal Laws',

    rightsReportTitle: 'Report',
    rightsReportDescription:
      'If you experience embarrassment, report it to Procon or seek legal guidance.',
    rightsReportSource: 'Consumer Protection Code',

    rightsOtherTitle: 'Other Rights',
    rightsBirthCompanionTitle: 'Birth Companion',
    rightsBirthCompanionDescription:
      'The right to a companion of your choice during labor, birth, and the immediate postpartum period.',
    rightsBirthCompanionSource: 'Law 11.108/2005',

    rightsRoomingInTitle: 'Rooming-in',
    rightsRoomingInDescription:
      'Mother and baby should remain together 24 hours after birth, unless there is a medical reason otherwise.',
    rightsRoomingInSource:
      'Ministry of Health Ordinance 2.068/2016',

    rightsAppointmentsTitle: 'Appointments and Exams',
    rightsAppointmentsDescription:
      'Pregnant workers have the right to be excused from work for appointments and exams during pregnancy.',
    rightsAppointmentsSource: 'CLT Art. 392, §4',

    rightsFaqDismissalTitle:
      'Can I be dismissed while breastfeeding?',
    rightsFaqDismissalDescription:
      'NO. You have job stability from pregnancy until 5 months after childbirth. Dismissal without cause during this period is illegal.',
    rightsFaqDismissalSource: 'ADCT Art. 10, II, b',

    rightsFaqBreaksTitle: 'How many breaks do I have at work?',
    rightsFaqBreaksDescription:
      'Two 30-minute breaks during the workday until the baby reaches 6 months of age.',
    rightsFaqBreaksSource: 'CLT Art. 396',

    rightsFaqPublicTitle: 'Can I breastfeed in public?',
    rightsFaqPublicDescription:
      'YES! It is a guaranteed right. No one may prevent or embarrass you for breastfeeding anywhere.',
    rightsFaqPublicSource:
      'Child and Adolescent Statute and Local Laws',

    rightsFaqUnemployedTitle:
      'Am I entitled to leave even if I am unemployed?',
    rightsFaqUnemployedDescription:
      'Yes, if you are within the INSS grace period, generally up to 12 months after your last job, you may receive maternity benefits.',
    rightsFaqUnemployedSource: 'Law 8.213/91',

    careHeaderEyebrow: 'Simple organization for daily life',
    careHeaderDescription:
      'Small steps to make your breastfeeding routine more comfortable, organized, and peaceful.',
    yourProgress: 'Your progress',
    careStepsCompleted: 'care steps completed',
    careStep: 'Care step',
    markAsCompleted: 'Mark as completed:',
    unmark: 'Unmark:',
    hideTips: 'Hide tips',
    viewSimpleTips: 'View simple tips',

    careStep1Title: 'Prepare what you need',
    careStep1Subtitle: 'Keep nearby what you may need.',
    careStep1Tip1: 'Keep water nearby to stay hydrated.',
    careStep1Tip2:
      'Set aside a diaper, a clean cloth, and baby items.',
    careStep1Tip3:
      'Keep your phone charged in case you need guidance.',

    careStep2Title: 'Keep everything within reach',
    careStep2Subtitle: 'Avoid getting up during feeding.',
    careStep2Tip1:
      'Choose a comfortable chair, sofa, or bed.',
    careStep2Tip2:
      'Support your back and, if possible, your feet.',
    careStep2Tip3:
      'Keep important items close to you.',

    careStep3Title: 'Take care of hygiene',
    careStep3Subtitle: 'Small habits help your routine.',
    careStep3Tip1:
      'Wash your hands before caring for the baby.',
    careStep3Tip2: 'Use clean cloths when necessary.',
    careStep3Tip3:
      'Keep the space organized and pleasant.',

    careStep4Title: 'Build your routine',
    careStep4Subtitle: 'Each day can become a little easier.',
    careStep4Tip1:
      'Observe the times when your baby usually feeds.',
    careStep4Tip2: 'Take breaks to rest when you can.',
    careStep4Tip3: 'Ask someone you trust for help.',

    careStep5Title: 'Keep what works',
    careStep5Subtitle:
      'Repeat the care habits that help you and your baby.',
    careStep5Tip1: 'Use this list whenever you need it.',
    careStep5Tip2:
      'Adjust your routine according to your needs.',
    careStep5Tip3:
      'Seek professional support if you have pain or difficulties.',

    careWarningTitle: 'Pay attention to your body’s signals',
    careWarningDescription:
      'Severe pain, fever, intense breast redness, or difficulty for the baby to feed are signs to seek a health service or a trusted professional.',

    returnHeaderEyebrow: 'Preparation with simple steps',
    returnHeaderDescription:
      'Organize your routine, learn about your rights, and prepare to continue breastfeeding according to your reality.',
    myPreparation: 'My preparation',
    returnStepsCompleted: 'steps completed',
    returnImportantSteps: 'Important steps',
    hideGuidance: 'Hide guidance for',
    viewGuidance: 'View guidance for',

    returnTask1: 'Learn about my rights as a nursing mother.',
    returnTask2: 'Talk about breaks and support at work.',
    returnTask3: 'Set aside containers to store milk.',
    returnTask4: 'Plan possible times for pumping.',
    returnTask5:
      'Talk to my support network or caregiver.',
    returnTask6:
      'Organize my bag and items for returning.',

    returnStepRightsTitle: 'Learn about your rights',
    returnStepRightsDescription:
      'See important information to balance work and breastfeeding.',
    returnStepRightsTip1:
      'In general, Brazilian labor law provides two special 30-minute breastfeeding breaks during the workday until the baby reaches 6 months of age.',
    returnStepRightsTip2:
      'Talk with your employer about schedules, breaks, and possible support.',
    returnStepRightsTip3:
      'If you have questions, consult official channels, HR, a union, or legal guidance.',
    returnStepRightsAction: 'View nursing rights',

    returnStepPumpingTitle: 'Prepare for pumping',
    returnStepPumpingDescription:
      'Organize items and schedules for expressing and storing milk.',
    returnStepPumpingTip1:
      'Start preparing in advance to learn which routine works for you.',
    returnStepPumpingTip2:
      'Set aside appropriate containers labeled with the collection date and time.',
    returnStepPumpingTip3:
      'Use the Pumping Diary to track times, duration, and quantity.',
    returnStepPumpingAction: 'Open Pumping Diary',

    returnStepRoutineTitle: 'Organize your routine',
    returnStepRoutineDescription:
      'Plan your day with support from family, a caregiver, or a trusted network.',
    returnStepRoutineTip1:
      'Talk with the person who will care for the baby about schedules and ways to offer milk.',
    returnStepRoutineTip2:
      'Plan transportation and set aside necessary items the day before.',
    returnStepRoutineTip3:
      'Include possible moments for rest, hydration, and emotional support.',
    returnStepRoutineAction: 'View smart care',

    returnStepPlanTitle: 'Build your weekly plan',
    returnStepPlanDescription:
      'Follow simple tasks to prepare with peace of mind.',
    returnStepPlanTip1:
      'Choose only the tasks that make sense for your reality.',
    returnStepPlanTip2:
      'Complete one step at a time: you do not have to do everything on the same day.',
    returnStepPlanTip3:
      'Track your preparation percentage on the Tasks screen.',
    returnStepPlanAction: 'Open weekly tasks',

    returnReminderTitle: 'Important reminder',
    returnReminderDescription:
      'Every family has a different routine. Use these guidelines as support and seek a health service, human milk bank, or trusted professional if you need individual guidance.',

    emergencyTapToCall: 'Tap a number to call',
    emergencySamuDescription:
      'Mobile Emergency Care Service',
    emergencyCvvDescription:
      'Emotional support and suicide prevention',
    emergencyHealthLineName: 'Health Line',
    emergencyHealthLineDescription:
      'Health information and SUS ombudsman service',
    emergencyPoliceName: 'Police',
    emergencyPoliceDescription:
      'Military Police - Emergencies',
    emergencyFirefightersName: 'Firefighters',
    emergencyFirefightersDescription:
      'Fire Department - Rescue service',
  },
};

export const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      language: 'pt',

      ordenhaRecords: [
        {
          id: 1,
          date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          duration: 15,
          quantity: 120,
          breast: 'both',
          notes: '',
        },
        {
          id: 2,
          date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          duration: 12,
          quantity: 100,
          breast: 'left',
          notes: '',
        },
        {
          id: 3,
          date: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
          duration: 18,
          quantity: 140,
          breast: 'both',
          notes: 'Boa produção',
        },
      ],

      tasks: [
        {
          id: 1,
          title: 'Vacina BCG',
          category: 'baby',
          status: 'todo',
          date: '2024-02-15',
        },
        {
          id: 2,
          title: 'Consulta pediatra',
          category: 'baby',
          status: 'inProgress',
          date: '2024-02-10',
        },
        {
          id: 3,
          title: 'Amamentar 8x ao dia',
          category: 'breastfeeding',
          status: 'inProgress',
          date: '',
        },
        {
          id: 4,
          title: 'Tomar água',
          category: 'mother',
          status: 'todo',
          date: '',
        },
      ],

      login: (userData) =>
        set((state) => ({
          user: {
            ...state.user,
            ...userData,

            profile: {
              ...state.user?.profile,
              ...userData?.profile,
            },

            routine: {
              ...state.user?.routine,
              ...userData?.routine,
            },

            onboarding: {
              ...state.user?.onboarding,
              ...userData?.onboarding,
            },

            privacyConsent: {
              ...state.user?.privacyConsent,
              ...userData?.privacyConsent,
            },
          },

          isLoggedIn: true,
        })),

      logout: () =>
        set({
          user: null,
          isLoggedIn: false,
        }),

      updateProfile: (profileData) =>
        set((state) => ({
          user: {
            ...state.user,

            profile: {
              ...state.user?.profile,
              ...profileData,
            },
          },
        })),

      startRoutineChange: () =>
        set((state) => ({
          user: {
            ...state.user,

            routine: {
              workType: '',
              schedule: '',
              babyCare: '',
              priority: '',
              wantsTutorial: true,
            },

            onboarding: {
              ...state.user?.onboarding,
              routineCompleted: false,
              showSuggestions: false,
            },
          },
        })),

      saveRoutine: (routineData) =>
        set((state) => ({
          user: {
            ...state.user,

            routine: {
              ...state.user?.routine,
              ...routineData,
            },

            onboarding: {
              ...state.user?.onboarding,
              routineCompleted: true,
              showSuggestions: true,
            },
          },
        })),

      finishSuggestions: () =>
        set((state) => ({
          user: {
            ...state.user,

            onboarding: {
              ...state.user?.onboarding,
              showSuggestions: false,
            },
          },
        })),

      toggleLanguage: () =>
        set((state) => ({
          language: state.language === 'pt' ? 'en' : 'pt',
        })),

      t: (key) => translations[get().language][key] || key,

      addOrdenhaRecord: (record) =>
        set((state) => ({
          ordenhaRecords: [
            {
              ...record,
              id: Date.now(),
            },
            ...state.ordenhaRecords,
          ],
        })),

      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: Date.now(),
            },
          ],
        })),

      moveTask: (taskId, newStatus) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  status: newStatus,
                }
              : task
          ),
        })),

      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),

      getNextPumpingEstimate: () => {
        const records = get().ordenhaRecords;

        if (records.length < 2) {
          return null;
        }

        const intervals = [];

        for (
          let index = 0;
          index < Math.min(records.length - 1, 5);
          index += 1
        ) {
          intervals.push(
            new Date(records[index].date) -
              new Date(records[index + 1].date)
          );
        }

        const averageInterval =
          intervals.reduce((total, interval) => total + interval, 0) /
          intervals.length;

        return new Date(
          new Date(records[0].date).getTime() + averageInterval
        );
      },
    }),

    {
      name: 'amarternar-storage',

      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        language: state.language,
        ordenhaRecords: state.ordenhaRecords,
        tasks: state.tasks,
      }),
    }
  )
);
