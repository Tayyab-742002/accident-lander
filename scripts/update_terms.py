import json

DEFS = [
  'Account means a unique account created for you to access our Service or parts of our Service.',
  'Affiliate means an entity that controls, is controlled by, or is under common control with a party.',
  'Company refers to Case Settlement Now (also known as Accident Help Now).',
  'Service refers to the Website and all services offered through it.',
  'Service Provider means any third-party company or individual employed to facilitate, provide, or assist with the Service.',
  'User, You or Your means the individual or legal entity that accesses or uses the Service.',
  'Website refers to Case Settlement Now (also known as Accident Help Now), accessible from https://casesettlementnow.com.',
]

REST_LIST = [
  'Use the Service for any illegal purpose.',
  'Interfere with or attempt to disrupt the Service.',
  'Use automated systems or software to extract data from the Service.',
  'Impersonate any person or entity or falsely represent your affiliation with any person or entity.',
]

def build_en():
  return {
    'title': 'Terms of Service',
    'lastUpdated': 'Last updated: November 13, 2024',
    'intro': 'Welcome to Case Settlement Now (also known as Accident Help Now). These Terms of Service ("Terms", "Agreement") govern your use of our website located at https://casesettlementnow.com ("Service") and any related services provided by Case Settlement Now (also known as Accident Help Now) ("Company", "We", "Us", or "Our").\n\nBy accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.',
    's1Title': 'Interpretation and Definitions',
    's1InterpTitle': 'Interpretation',
    's1InterpBody': 'Words with initial capital letters have defined meanings under the following conditions. These definitions apply whether the terms appear in singular or plural form.',
    's1DefsTitle': 'Definitions',
    's1DefsIntro': 'For the purposes of these Terms:',
    's1Defs': DEFS,
    's2Title': 'Use of Our Service',
    's2EligTitle': 'Eligibility',
    's2EligBody': 'You must be at least 18 years old and able to enter into a legally binding agreement to use the Service.',
    's2PurpTitle': 'Purpose',
    's2PurpBody': 'The Service is intended to provide information, guidance, and assistance for claims related to motor vehicle accidents (MVA).',
    's2AccTitle': 'Account Responsibilities',
    's2AccBody': 'You are responsible for maintaining the confidentiality of your Account information and for all activity that occurs under your Account. You agree to notify us immediately of any unauthorized use.',
    's2RestTitle': 'Restrictions',
    's2RestIntro': 'You agree not to:',
    's2RestList': REST_LIST,
    's3Title': 'Submitting Claims',
    's3AccTitle': 'Accuracy of Information',
    's3AccBody': 'You agree to provide accurate and complete information when submitting claims or interacting with the Service.',
    's3EligTitle': 'Eligibility',
    's3EligBody': 'Not all users may qualify for legal assistance or settlement services. We reserve the right to disqualify any claim based on eligibility criteria or insufficient information.',
    's4Title': 'Payment and Fees',
    's4Body': 'Currently, the Service is offered free of charge to users who submit inquiries or complaints. If paid services are introduced, these fees will be clearly disclosed and payment will be required before the service is provided.',
    's5Title': 'Intellectual Property',
    's5Body': 'All content, logos, graphics, and materials provided through the Service are the property of Case Settlement Now (also known as Accident Help Now) or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.',
    's6Title': 'Limitation of Liability',
    's6Intro': 'To the maximum extent permitted by applicable United States law, Case Settlement Now (also known as Accident Help Now) will not be liable for:',
    's6List': [
      'Any direct, indirect, incidental, special, or consequential damages arising from the use of the Service.',
      'Errors, omissions, or inaccuracies in the information provided.',
      'Delays or failures in the processing of claims.',
    ],
    's7Title': 'Disclaimer',
    's7Body': 'This Service is provided for informational purposes only and does not constitute legal advice. You should consult a qualified attorney regarding your individual circumstances.',
    's8Title': 'Applicable Law',
    's8Body': 'These Terms are governed by and construed in accordance with the laws of Wyoming, United States. Any dispute arising under these Terms will be subject to the exclusive jurisdiction of the courts located in Wyoming.',
    's9Title': 'Changes to Terms',
    's9Body': 'We may update these Terms from time to time. Any changes will be posted on this page with an updated "Last Updated" date. Your continued use of the Service after such changes constitutes your acceptance of the updated Terms.',
    's10Title': 'Marketing Partner',
    's10Body': 'DK Law – Injuries, Accidents and More\n611 Anton Blvd, Costa Mesa, CA 92626',
    's11Title': 'Contact Us',
    's11Body': 'If you have any questions about these Terms, you can contact us:',
    's11Email': 'Email: remove@lc.casesettlementnow.com',
    's11Phone': 'Phone Number: +17704049406',
    'close': 'Close',
  }

def build_ca():
  t = build_en()
  t['s6Intro'] = 'To the maximum extent permitted by applicable California law, Case Settlement Now (also known as Accident Help Now) will not be liable for:'
  t['s8Body'] = 'These Terms are governed by and construed in accordance with the laws of the State of California, United States, without regard to conflict of law principles. Any dispute arising under these Terms will be subject to the exclusive jurisdiction of the courts located in California.'
  return t

def build_es():
  return {
    'title': 'Términos de Servicio',
    'lastUpdated': 'Última actualización: 13 de noviembre de 2024',
    'intro': 'Bienvenido a Case Settlement Now (también conocido como Accident Help Now). Estos Términos de Servicio ("Términos", "Acuerdo") rigen su uso de nuestro sitio web ubicado en https://casesettlementnow.com ("Servicio") y cualquier servicio relacionado proporcionado por Case Settlement Now (también conocido como Accident Help Now) ("Empresa", "Nosotros", "Nos" o "Nuestro").\n\nAl acceder o utilizar el Servicio, usted acepta estar sujeto a estos Términos. Si no está de acuerdo con estos Términos, no puede acceder ni utilizar el Servicio.',
    's1Title': 'Interpretación y Definiciones',
    's1InterpTitle': 'Interpretación',
    's1InterpBody': 'Las palabras con letras iniciales en mayúscula tienen significados definidos bajo las siguientes condiciones. Estas definiciones aplican ya sea que los términos aparezcan en forma singular o plural.',
    's1DefsTitle': 'Definiciones',
    's1DefsIntro': 'A los efectos de estos Términos:',
    's1Defs': [
      'Cuenta significa una cuenta única creada para que usted acceda a nuestro Servicio o partes del mismo.',
      'Afiliado significa una entidad que controla, es controlada por, o está bajo control común con una parte.',
      'Empresa se refiere a Case Settlement Now (también conocido como Accident Help Now).',
      'Servicio se refiere al Sitio Web y todos los servicios ofrecidos a través del mismo.',
      'Proveedor de Servicios significa cualquier empresa o individuo de terceros empleado para facilitar, proporcionar o asistir con el Servicio.',
      'Usuario, Usted o Su significa el individuo o entidad legal que accede o utiliza el Servicio.',
      'Sitio Web se refiere a Case Settlement Now (también conocido como Accident Help Now), accesible desde https://casesettlementnow.com.',
    ],
    's2Title': 'Uso de Nuestro Servicio',
    's2EligTitle': 'Elegibilidad',
    's2EligBody': 'Debe tener al menos 18 años y ser capaz de celebrar un acuerdo legalmente vinculante para usar el Servicio.',
    's2PurpTitle': 'Propósito',
    's2PurpBody': 'El Servicio está destinado a proporcionar información, orientación y asistencia para reclamaciones relacionadas con accidentes de vehículos de motor (MVA).',
    's2AccTitle': 'Responsabilidades de la Cuenta',
    's2AccBody': 'Usted es responsable de mantener la confidencialidad de la información de su Cuenta y de toda la actividad que ocurra bajo su Cuenta. Usted acepta notificarnos inmediatamente sobre cualquier uso no autorizado.',
    's2RestTitle': 'Restricciones',
    's2RestIntro': 'Usted acepta no:',
    's2RestList': [
      'Usar el Servicio para ningún propósito ilegal.',
      'Interferir o intentar interrumpir el Servicio.',
      'Usar sistemas automatizados o software para extraer datos del Servicio.',
      'Hacerse pasar por cualquier persona o entidad o representar falsamente su afiliación con cualquier persona o entidad.',
    ],
    's3Title': 'Presentación de Reclamaciones',
    's3AccTitle': 'Exactitud de la Información',
    's3AccBody': 'Usted acepta proporcionar información precisa y completa al presentar reclamaciones o interactuar con el Servicio.',
    's3EligTitle': 'Elegibilidad',
    's3EligBody': 'No todos los usuarios pueden calificar para asistencia legal o servicios de acuerdo. Nos reservamos el derecho de descalificar cualquier reclamación según criterios de elegibilidad o información insuficiente.',
    's4Title': 'Pago y Tarifas',
    's4Body': 'Actualmente, el Servicio se ofrece de forma gratuita a los usuarios que envíen consultas o quejas. Si se introducen servicios de pago, estas tarifas se divulgarán claramente y el pago será requerido antes de que se proporcione el servicio.',
    's5Title': 'Propiedad Intelectual',
    's5Body': 'Todo el contenido, logotipos, gráficos y materiales proporcionados a través del Servicio son propiedad de Case Settlement Now (también conocido como Accident Help Now) o sus licenciantes y están protegidos por leyes de derechos de autor, marcas registradas y otras leyes de propiedad intelectual. No puede reproducir, distribuir o crear obras derivadas sin nuestro permiso expreso por escrito.',
    's6Title': 'Limitación de Responsabilidad',
    's6Intro': 'En la máxima medida permitida por la ley aplicable de los Estados Unidos, Case Settlement Now (también conocido como Accident Help Now) no será responsable de:',
    's6List': [
      'Cualquier daño directo, indirecto, incidental, especial o consecuente que surja del uso del Servicio.',
      'Errores, omisiones o inexactitudes en la información proporcionada.',
      'Retrasos o fallas en el procesamiento de reclamaciones.',
    ],
    's7Title': 'Descargo de Responsabilidad',
    's7Body': 'Este Servicio se proporciona únicamente con fines informativos y no constituye asesoramiento legal. Debe consultar a un abogado calificado sobre sus circunstancias individuales.',
    's8Title': 'Ley Aplicable',
    's8Body': 'Estos Términos se rigen e interpretan de acuerdo con las leyes de Wyoming, Estados Unidos. Cualquier disputa que surja bajo estos Términos estará sujeta a la jurisdicción exclusiva de los tribunales ubicados en Wyoming.',
    's9Title': 'Cambios en los Términos',
    's9Body': 'Podemos actualizar estos Términos de vez en cuando. Cualquier cambio se publicará en esta página con una fecha de "Última Actualización" actualizada. Su uso continuado del Servicio después de dichos cambios constituye su aceptación de los Términos actualizados.',
    's10Title': 'Socio de Marketing',
    's10Body': 'DK Law – Injuries, Accidents and More\n611 Anton Blvd, Costa Mesa, CA 92626',
    's11Title': 'Contáctenos',
    's11Body': 'Si tiene alguna pregunta sobre estos Términos, puede contactarnos:',
    's11Email': 'Correo electrónico: remove@lc.casesettlementnow.com',
    's11Phone': 'Número de teléfono: +17704049406',
    'close': 'Cerrar',
  }

updates = {'en': build_en(), 'es': build_es(), 'ca': build_ca()}

for locale, terms in updates.items():
  path = f'd:/lander/messages/{locale}.json'
  with open(path, encoding='utf-8') as f:
    data = json.load(f)
  data['terms'] = terms
  with open(path, 'wb') as f:
    f.write(json.dumps(data, ensure_ascii=False, indent=2).encode('utf-8'))
  print(f'{locale}: done')
