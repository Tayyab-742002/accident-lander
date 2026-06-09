import json

EN_SECTIONS = [
  {
    "title": "ADVERTISING DISCLOSURE",
    "body": "Case Settlement Now (also known as Accident Help Now) is a legal advertising and lead generation service. We are not a law firm, attorney, legal referral service, or legal advice provider. The information contained on this website is provided for general informational purposes only and should not be construed as legal advice. Visiting this website, communicating with us, or submitting information through any form on this website does not create an attorney-client relationship between you and Case Settlement Now (also known as Accident Help Now), Exclusive Leads Agency, or any participating attorney or law firm."
  },
  {
    "title": "ATTORNEY ADVERTISING NOTICE",
    "body": "This website constitutes attorney advertising. Case Settlement Now (also known as Accident Help Now) connects consumers who may have legal claims with licensed attorneys and law firms in their respective jurisdictions. Any attorney or law firm that may contact you is independently licensed to practice law in the applicable state or jurisdiction. Case Settlement Now (also known as Accident Help Now), Exclusive Leads Agency, and their affiliates do not endorse, recommend, or guarantee the quality, expertise, credentials, or services of any attorney or law firm."
  },
  {
    "title": "NO ATTORNEY-CLIENT RELATIONSHIP",
    "body": "Submission of information through this website, completion of any form, participation in any questionnaire, telephone communications, emails, text messages, or other communications with Case Settlement Now (also known as Accident Help Now) does not establish an attorney-client relationship. An attorney-client relationship can only be established through a separate written agreement between you and a licensed attorney or law firm."
  },
  {
    "title": "NO LEGAL ADVICE",
    "body": "Nothing contained on this website should be interpreted as legal advice, legal opinions, or legal recommendations. The content provided is intended solely for informational and educational purposes. You should consult a qualified attorney licensed in your jurisdiction regarding your specific legal situation before making any legal decisions."
  },
  {
    "title": "NO GUARANTEE OF RESULTS",
    "body": "Prior results do not guarantee a similar outcome. Every legal matter is unique and depends on its specific facts, circumstances, evidence, applicable law, and other factors. Any statements regarding settlements, verdicts, recoveries, or case outcomes are not guarantees, warranties, or predictions of future results."
  },
  {
    "title": "SETTLEMENT AMOUNTS DISCLOSURE",
    "body": "Any settlement amounts, verdicts, awards, recoveries, or case results displayed on this website are provided solely for illustrative and informational purposes. These figures reflect results achieved in specific cases and should not be interpreted as a guarantee, warranty, or prediction of the outcome of any future legal matter. Individual results will vary significantly."
  },
  {
    "title": "CONTINGENCY FEE NOTICE",
    "body": "Attorneys who may contact you through Case Settlement Now (also known as Accident Help Now) generally handle personal injury matters on a contingency fee basis, meaning attorney fees are typically paid only if a recovery is obtained. However, fee structures vary by attorney, law firm, case type, and jurisdiction. You should discuss all fees, costs, and representation terms directly with the attorney or law firm you choose to retain."
  },
  {
    "title": "TCPA & COMMUNICATIONS CONSENT",
    "body": "By submitting your information through this website, you expressly consent to be contacted by Case Settlement Now (also known as Accident Help Now), Exclusive Leads Agency, their affiliated companies, marketing partners, referral partners, intake partners, service providers, vendors, and participating law firms regarding your inquiry.\n\nYou agree that such communications may be made through telephone calls, text messages (SMS), emails, prerecorded voice messages, artificial voice messages, automated technology, and automatic telephone dialing systems, even if your telephone number appears on any federal, state, or internal Do Not Call registry, to the extent permitted by applicable law.\n\nYour consent is not required as a condition of purchasing any goods or services. Standard message and data rates may apply. You may revoke your consent at any time by replying STOP to any text message, utilizing available unsubscribe mechanisms, or contacting us directly using the contact information provided below."
  },
  {
    "title": "INFORMATION SHARING & LEAD DISTRIBUTION",
    "body": "By submitting your information, you acknowledge and agree that your information may be shared with Exclusive Leads Agency, affiliated companies, marketing partners, referral partners, intake partners, service providers, vendors, participating attorneys, and participating law firms for the purpose of evaluating your potential legal claim and contacting you regarding legal services. Not every inquiry will result in attorney representation."
  },
  {
    "title": "PRIVACY & DATA USE",
    "body": "We collect personal information solely for purposes related to evaluating your inquiry and connecting you with attorneys, law firms, and legal service providers who may be able to assist you. We may share your information with our affiliated companies, marketing partners, referral partners, intake partners, service providers, vendors, attorneys, and law firms as described herein.\n\nWe do not sell personal information to unrelated third parties for their independent marketing purposes. Please review our Privacy Policy for additional details regarding the collection, use, storage, disclosure, and protection of your information."
  },
  {
    "title": "THIRD-PARTY WEBSITES & SERVICES",
    "body": "This website may contain links to third-party websites, services, or resources. Case Settlement Now (also known as Accident Help Now), Exclusive Leads Agency, and their affiliates are not responsible for the content, accuracy, availability, privacy practices, or policies of any third-party website or service. Inclusion of any link does not imply endorsement or recommendation."
  },
  {
    "title": "NO ENDORSEMENT",
    "body": "References to attorneys, law firms, legal services, settlements, verdicts, testimonials, reviews, or other materials on this website do not constitute endorsements, guarantees, or recommendations. Users should independently evaluate any attorney or law firm before retaining legal representation."
  },
  {
    "title": "JURISDICTIONAL LIMITATIONS",
    "body": "Legal services may not be available in all states or jurisdictions. Attorneys and law firms are licensed only in the jurisdictions in which they are authorized to practice. Any legal services offered are subject to applicable state laws, professional conduct rules, and attorney advertising regulations."
  },
  {
    "title": "CONTACT INFORMATION",
    "body": "Case Settlement Now (also known as Accident Help Now)\nEmail: remove@lc.casesettlementnow.com\nPhone: +1 (770) 404-9406\n\nBy using this website or submitting your information, you acknowledge that you have read, understood, and agree to the terms of this Disclaimer, Privacy Policy, Terms of Use, and applicable consent language."
  },
]

ES_SECTIONS = [
  {
    "title": "DIVULGACIÓN PUBLICITARIA",
    "body": "Case Settlement Now (también conocido como Accident Help Now) es un servicio de publicidad legal y generación de prospectos. No somos un bufete de abogados, abogado, servicio de referencia legal ni proveedor de asesoramiento legal. La información contenida en este sitio web se proporciona únicamente con fines informativos generales y no debe interpretarse como asesoramiento legal. Visitar este sitio web, comunicarse con nosotros o enviar información a través de cualquier formulario en este sitio web no crea una relación abogado-cliente entre usted y Case Settlement Now (también conocido como Accident Help Now), Exclusive Leads Agency, o cualquier abogado o bufete participante."
  },
  {
    "title": "AVISO DE PUBLICIDAD DE ABOGADOS",
    "body": "Este sitio web constituye publicidad de abogados. Case Settlement Now (también conocido como Accident Help Now) conecta a consumidores que pueden tener reclamaciones legales con abogados y bufetes de abogados con licencia en sus respectivas jurisdicciones. Cualquier abogado o bufete que pueda contactarle tiene licencia independiente para ejercer la ley en el estado o jurisdicción aplicable. Case Settlement Now (también conocido como Accident Help Now), Exclusive Leads Agency y sus afiliados no respaldan, recomiendan ni garantizan la calidad, experiencia, credenciales o servicios de ningún abogado o bufete."
  },
  {
    "title": "SIN RELACIÓN ABOGADO-CLIENTE",
    "body": "El envío de información a través de este sitio web, la cumplimentación de cualquier formulario, la participación en cualquier cuestionario, comunicaciones telefónicas, correos electrónicos, mensajes de texto u otras comunicaciones con Case Settlement Now (también conocido como Accident Help Now) no establece una relación abogado-cliente. Una relación abogado-cliente solo puede establecerse mediante un acuerdo escrito separado entre usted y un abogado o bufete con licencia."
  },
  {
    "title": "SIN ASESORAMIENTO LEGAL",
    "body": "Nada de lo contenido en este sitio web debe interpretarse como asesoramiento legal, opiniones legales o recomendaciones legales. El contenido proporcionado está destinado únicamente a fines informativos y educativos. Debe consultar a un abogado calificado con licencia en su jurisdicción sobre su situación legal específica antes de tomar cualquier decisión legal."
  },
  {
    "title": "SIN GARANTÍA DE RESULTADOS",
    "body": "Los resultados anteriores no garantizan un resultado similar. Cada asunto legal es único y depende de sus hechos específicos, circunstancias, evidencia, ley aplicable y otros factores. Cualquier declaración sobre acuerdos, veredictos, recuperaciones o resultados de casos no son garantías, garantías ni predicciones de resultados futuros."
  },
  {
    "title": "DIVULGACIÓN DE MONTOS DE ACUERDOS",
    "body": "Cualquier monto de acuerdo, veredicto, laudo, recuperación o resultado de caso mostrado en este sitio web se proporciona únicamente con fines ilustrativos e informativos. Estas cifras reflejan resultados obtenidos en casos específicos y no deben interpretarse como una garantía o predicción del resultado de cualquier asunto legal futuro. Los resultados individuales variarán significativamente."
  },
  {
    "title": "AVISO DE HONORARIOS DE CONTINGENCIA",
    "body": "Los abogados que pueden contactarle a través de Case Settlement Now (también conocido como Accident Help Now) generalmente manejan asuntos de lesiones personales sobre la base de honorarios de contingencia, lo que significa que los honorarios del abogado generalmente se pagan solo si se obtiene una recuperación. Sin embargo, las estructuras de honorarios varían según el abogado, bufete, tipo de caso y jurisdicción. Debe discutir todos los honorarios, costos y términos de representación directamente con el abogado o bufete que elija contratar."
  },
  {
    "title": "CONSENTIMIENTO TCPA Y COMUNICACIONES",
    "body": "Al enviar su información a través de este sitio web, usted consiente expresamente ser contactado por Case Settlement Now (también conocido como Accident Help Now), Exclusive Leads Agency, sus empresas afiliadas, socios de marketing, socios de referencia, socios de ingesta, proveedores de servicios, vendedores y bufetes participantes con respecto a su consulta.\n\nUsted acepta que dichas comunicaciones pueden realizarse a través de llamadas telefónicas, mensajes de texto (SMS), correos electrónicos, mensajes de voz pregrabados, mensajes de voz artificial, tecnología automatizada y sistemas de marcación telefónica automática, incluso si su número aparece en cualquier registro federal, estatal o interno de No Llamar, en la medida permitida por la ley aplicable.\n\nSu consentimiento no es un requisito para la compra de bienes o servicios. Pueden aplicarse tarifas estándar de mensajes y datos. Puede revocar su consentimiento en cualquier momento respondiendo STOP a cualquier mensaje de texto o contactándonos directamente."
  },
  {
    "title": "INTERCAMBIO DE INFORMACIÓN Y DISTRIBUCIÓN DE PROSPECTOS",
    "body": "Al enviar su información, usted reconoce y acepta que su información puede ser compartida con Exclusive Leads Agency, empresas afiliadas, socios de marketing, socios de referencia, socios de ingesta, proveedores de servicios, vendedores, abogados participantes y bufetes participantes con el fin de evaluar su posible reclamación legal. No todas las consultas resultarán en representación legal."
  },
  {
    "title": "PRIVACIDAD Y USO DE DATOS",
    "body": "Recopilamos información personal únicamente para fines relacionados con la evaluación de su consulta y conectarle con abogados, bufetes y proveedores de servicios legales que puedan asistirle. Podemos compartir su información con nuestras empresas afiliadas, socios de marketing, socios de referencia, socios de ingesta, proveedores de servicios, vendedores, abogados y bufetes como se describe aquí.\n\nNo vendemos información personal a terceros no relacionados para sus propios fines de marketing. Consulte nuestra Política de Privacidad para obtener detalles adicionales."
  },
  {
    "title": "SITIOS WEB Y SERVICIOS DE TERCEROS",
    "body": "Este sitio web puede contener enlaces a sitios web, servicios o recursos de terceros. Case Settlement Now (también conocido como Accident Help Now), Exclusive Leads Agency y sus afiliados no son responsables del contenido, precisión, disponibilidad, prácticas de privacidad o políticas de ningún sitio web o servicio de terceros. La inclusión de cualquier enlace no implica respaldo ni recomendación."
  },
  {
    "title": "SIN RESPALDO",
    "body": "Las referencias a abogados, bufetes, servicios legales, acuerdos, veredictos, testimonios, reseñas u otros materiales en este sitio web no constituyen respaldos, garantías ni recomendaciones. Los usuarios deben evaluar de forma independiente a cualquier abogado o bufete antes de contratar representación legal."
  },
  {
    "title": "LIMITACIONES JURISDICCIONALES",
    "body": "Los servicios legales pueden no estar disponibles en todos los estados o jurisdicciones. Los abogados y bufetes tienen licencia solo en las jurisdicciones en las que están autorizados para ejercer. Los servicios legales ofrecidos están sujetos a las leyes estatales aplicables, reglas de conducta profesional y regulaciones de publicidad de abogados."
  },
  {
    "title": "INFORMACIÓN DE CONTACTO",
    "body": "Case Settlement Now (también conocido como Accident Help Now)\nCorreo electrónico: remove@lc.casesettlementnow.com\nTeléfono: +1 (770) 404-9406\n\nAl usar este sitio web o enviar su información, usted reconoce que ha leído, comprendido y acepta los términos de este Aviso Legal, Política de Privacidad, Términos de Uso y el lenguaje de consentimiento aplicable."
  },
]

for locale in ['en', 'es']:
  path = f'd:/lander/messages/{locale}.json'
  with open(path, encoding='utf-8') as f:
    data = json.load(f)
  sections = EN_SECTIONS if locale == 'en' else ES_SECTIONS
  data['disclaimer']['sections'] = sections
  with open(path, 'wb') as f:
    f.write(json.dumps(data, ensure_ascii=False, indent=2).encode('utf-8'))
  print(f'{locale}: updated ({len(sections)} sections)')
