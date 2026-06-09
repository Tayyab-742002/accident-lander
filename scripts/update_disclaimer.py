import json

EN_SECTIONS = [
  {
    "title": "ADVERTISING DISCLOSURE",
    "body": "Case Settlement Now (also known as Accident Help Now) is a legal advertising and lead generation service. We are not a law firm, attorney, or legal referral service. The information provided on this website is for general informational purposes only and does not constitute legal advice. No attorney-client relationship is formed by visiting this website or submitting your information through any form on this site."
  },
  {
    "title": "ATTORNEY ADVERTISING NOTICE",
    "body": "This website constitutes attorney advertising. Case Settlement Now (also known as Accident Help Now) connects individuals who may have legal claims with licensed attorneys and law firms in their respective states. All attorneys and law firms we work with are independently licensed to practice law in their respective jurisdictions. Case Settlement Now (also known as Accident Help Now) does not endorse, recommend, or guarantee the quality of services provided by any attorney or law firm."
  },
  {
    "title": "NO GUARANTEE OF RESULTS",
    "body": "Prior results do not guarantee a similar outcome. Every legal case is unique and depends on its own facts, circumstances, and the applicable laws of the relevant jurisdiction. Settlement amounts and verdicts shown on this website are for illustrative purposes only and are not guarantees of future results. Results achieved in past cases do not predict or guarantee results in future cases."
  },
  {
    "title": "SETTLEMENT AMOUNTS DISCLOSURE",
    "body": "Any settlement amounts, verdicts, or case results displayed on this website are meant for illustrative purposes only. These figures represent results obtained in specific cases and do not represent a guarantee, warranty, or prediction regarding the outcome of any future legal matter. Individual results will vary based on the specific facts and legal merits of each case."
  },
  {
    "title": "NO LEGAL ADVICE",
    "body": "Nothing on this website should be construed as legal advice. The content provided is for general informational purposes only. You should consult with a qualified, licensed attorney in your jurisdiction before making any legal decisions. Submitting your information through our website does not create an attorney-client relationship between you and Case Settlement Now (also known as Accident Help Now) or any affiliated attorney or law firm."
  },
  {
    "title": "CONTINGENCY FEE NOTICE",
    "body": "Attorneys who may contact you through Case Settlement Now (also known as Accident Help Now) generally work on a contingency fee basis, meaning you pay no attorney fees unless your case is successfully resolved. However, contingency fee arrangements vary by attorney and jurisdiction. You should discuss all fee arrangements directly with any attorney you choose to retain."
  },
  {
    "title": "TCPA & COMMUNICATIONS CONSENT",
    "body": "By submitting your information on this website, you expressly consent to be contacted by Case Settlement Now (also known as Accident Help Now) and its partners via telephone calls, emails, and text messages, including through the use of automated dialing systems, pre-recorded messages, and artificial voice messages, even if your number is listed on a federal, state, or corporate Do Not Call registry. Standard message and data rates may apply. Your consent is not a condition of any purchase or service."
  },
  {
    "title": "THIRD-PARTY LINKS & SERVICES",
    "body": "This website may contain links to third-party websites or services. Case Settlement Now (also known as Accident Help Now) is not responsible for the content, accuracy, or privacy practices of any third-party websites. The inclusion of any link does not imply endorsement by Case Settlement Now (also known as Accident Help Now)."
  },
  {
    "title": "PRIVACY & DATA USE",
    "body": "We collect personal information submitted through our website solely for the purpose of connecting you with licensed legal professionals. Your information may be shared with our network of attorneys, law firms, and legal service providers. We do not sell your personal information to unrelated third parties. For full details on how we collect, use, and protect your data, please refer to our Privacy Policy."
  },
  {
    "title": "CONTACT INFORMATION",
    "body": "Case Settlement Now (also known as Accident Help Now)\nEmail: remove@lc.casesettlementnow.com\nPhone Number: +17704049406"
  },
]

ES_SECTIONS = [
  {
    "title": "DIVULGACIÓN PUBLICITARIA",
    "body": "Case Settlement Now (también conocido como Accident Help Now) es un servicio de publicidad legal y generación de leads. No somos un bufete de abogados, abogado ni servicio de referencia legal. La información proporcionada en este sitio web es únicamente para fines informativos generales y no constituye asesoramiento legal. No se forma ninguna relación abogado-cliente al visitar este sitio web o enviar su información a través de cualquier formulario en este sitio."
  },
  {
    "title": "AVISO DE PUBLICIDAD DE ABOGADOS",
    "body": "Este sitio web constituye publicidad de abogados. Case Settlement Now (también conocido como Accident Help Now) conecta a personas que pueden tener reclamaciones legales con abogados y bufetes de abogados con licencia en sus respectivos estados. Todos los abogados y bufetes de abogados con los que trabajamos tienen licencia independiente para ejercer la ley en sus respectivas jurisdicciones. Case Settlement Now (también conocido como Accident Help Now) no respalda, recomienda ni garantiza la calidad de los servicios proporcionados por ningún abogado o bufete de abogados."
  },
  {
    "title": "SIN GARANTÍA DE RESULTADOS",
    "body": "Los resultados anteriores no garantizan un resultado similar. Cada caso legal es único y depende de sus propios hechos, circunstancias y las leyes aplicables de la jurisdicción relevante. Los montos de acuerdos y veredictos mostrados en este sitio web son únicamente para fines ilustrativos y no son garantías de resultados futuros."
  },
  {
    "title": "DIVULGACIÓN DE MONTOS DE ACUERDOS",
    "body": "Cualquier monto de acuerdo, veredicto o resultado de caso mostrado en este sitio web es únicamente para fines ilustrativos. Estas cifras representan resultados obtenidos en casos específicos y no representan una garantía, garantía o predicción con respecto al resultado de cualquier asunto legal futuro. Los resultados individuales variarán según los hechos específicos y los méritos legales de cada caso."
  },
  {
    "title": "SIN ASESORAMIENTO LEGAL",
    "body": "Nada en este sitio web debe interpretarse como asesoramiento legal. El contenido proporcionado es únicamente para fines informativos generales. Debe consultar con un abogado calificado y con licencia en su jurisdicción antes de tomar cualquier decisión legal. Enviar su información a través de nuestro sitio web no crea una relación abogado-cliente entre usted y Case Settlement Now (también conocido como Accident Help Now) o cualquier abogado o bufete de abogados afiliado."
  },
  {
    "title": "AVISO DE HONORARIOS DE CONTINGENCIA",
    "body": "Los abogados que pueden contactarle a través de Case Settlement Now (también conocido como Accident Help Now) generalmente trabajan sobre una base de honorarios de contingencia, lo que significa que no paga honorarios de abogados a menos que su caso se resuelva exitosamente. Sin embargo, los acuerdos de honorarios de contingencia varían según el abogado y la jurisdicción. Debe discutir todos los acuerdos de honorarios directamente con cualquier abogado que elija contratar."
  },
  {
    "title": "CONSENTIMIENTO DE TCPA Y COMUNICACIONES",
    "body": "Al enviar su información en este sitio web, usted consiente expresamente ser contactado por Case Settlement Now (también conocido como Accident Help Now) y sus socios mediante llamadas telefónicas, correos electrónicos y mensajes de texto, incluso mediante el uso de sistemas de marcación automatizada, mensajes pregrabados y mensajes de voz artificial, incluso si su número está en un registro federal, estatal o corporativo de No Llamar. Pueden aplicarse tarifas estándar de mensajes y datos. Su consentimiento no es una condición de ninguna compra o servicio."
  },
  {
    "title": "ENLACES Y SERVICIOS DE TERCEROS",
    "body": "Este sitio web puede contener enlaces a sitios web o servicios de terceros. Case Settlement Now (también conocido como Accident Help Now) no es responsable del contenido, la precisión o las prácticas de privacidad de ningún sitio web de terceros. La inclusión de cualquier enlace no implica el respaldo de Case Settlement Now (también conocido como Accident Help Now)."
  },
  {
    "title": "PRIVACIDAD Y USO DE DATOS",
    "body": "Recopilamos información personal enviada a través de nuestro sitio web únicamente con el propósito de conectarle con profesionales legales con licencia. Su información puede ser compartida con nuestra red de abogados, bufetes de abogados y proveedores de servicios legales. No vendemos su información personal a terceros no relacionados. Para obtener detalles completos sobre cómo recopilamos, usamos y protegemos sus datos, consulte nuestra Política de Privacidad."
  },
  {
    "title": "INFORMACIÓN DE CONTACTO",
    "body": "Case Settlement Now (también conocido como Accident Help Now)\nCorreo electrónico: remove@lc.casesettlementnow.com\nNúmero de teléfono: +17704049406"
  },
]

CA_SECTIONS = [
  {
    "title": "General",
    "body": "ADVERTISEMENT. DK LAW – INJURY, ACCIDENT, AND MORE, PC, IS A PERSONAL INJURY LAW FIRM, LICENSED IN CALIFORNIA. PRIOR RESULTS DO NOT GUARANTEE A SIMILAR OUTCOME. OFFICE LOCATIONS AND ADDITIONAL INFORMATION CAN BE FOUND ON WWW.DKLAW.COM."
  },
  {
    "title": "Employee Video (Non-Attorney)",
    "body": "ADVERTISEMENT. DK LAW – INJURY, ACCIDENT, AND MORE, PC, IS A PERSONAL INJURY LAW FIRM, LICENSED IN CALIFORNIA. INDIVIDUAL DEPICTED IS NON-ATTORNEY. PRIOR RESULTS DO NOT GUARANTEE A SIMILAR OUTCOME. OFFICE LOCATIONS AND ADDITIONAL INFORMATION CAN BE FOUND ON WWW.DKLAW.COM."
  },
  {
    "title": "Professional Models",
    "body": "ADVERTISEMENT. DK LAW – INJURY, ACCIDENT, AND MORE, PC, IS A PERSONAL INJURY LAW FIRM, LICENSED IN CALIFORNIA. THE INDIVIDUALS DEPICTED ARE PAID PROFESSIONAL MODELS AND DO NOT REPRESENT ACTUAL CLIENTS OF THIS FIRM. PRIOR RESULTS DO NOT GUARANTEE A SIMILAR OUTCOME. OFFICE LOCATIONS AND ADDITIONAL INFORMATION CAN BE FOUND ON WWW.DKLAW.COM."
  },
  {
    "title": "AI Model",
    "body": "ADVERTISEMENT. DK LAW – INJURY, ACCIDENT, AND MORE, PC, IS A PERSONAL INJURY LAW FIRM, LICENSED IN CALIFORNIA. THE INDIVIDUALS DEPICTED ARE COMPUTER-GENERATED MODELS AND DO NOT REPRESENT ACTUAL CLIENTS OF THIS FIRM. PRIOR RESULTS DO NOT GUARANTEE A SIMILAR OUTCOME. OFFICE LOCATIONS AND ADDITIONAL INFORMATION CAN BE FOUND ON WWW.DKLAW.COM."
  },
  {
    "title": "Car Accident Scene/Dramatization",
    "body": "ADVERTISEMENT. DK LAW – INJURY, ACCIDENT, AND MORE, PC, IS A PERSONAL INJURY LAW FIRM, LICENSED IN CALIFORNIA. VISUAL DEPICTIONS OF SOME EVENTS ARE DRAMATIZATIONS. PRIOR RESULTS DO NOT GUARANTEE A SIMILAR OUTCOME. OFFICE LOCATIONS AND ADDITIONAL INFORMATION CAN BE FOUND ON WWW.DKLAW.COM."
  },
  {
    "title": "Car Accident Scenes with Models",
    "body": "ADVERTISEMENT. DK LAW – INJURY, ACCIDENT, AND MORE, PC, IS A PERSONAL INJURY LAW FIRM, LICENSED IN CALIFORNIA. DRAMATIZATION; SOME INDIVIDUALS DEPICTED ARE PAID PROFESSIONAL MODELS AND DO NOT REPRESENT ACTUAL CLIENTS OF THIS FIRM. PRIOR RESULTS DO NOT GUARANTEE A SIMILAR OUTCOME. OFFICE LOCATIONS AND ADDITIONAL INFORMATION CAN BE FOUND ON WWW.DKLAW.COM."
  },
  {
    "title": "Settlement Amount Disclaimer (w/ outside firm)",
    "body": "ADVERTISEMENT. DK LAW – INJURY, ACCIDENT, AND MORE, PC, IS A PERSONAL INJURY LAW FIRM, LICENSED IN CALIFORNIA. SOME SETTLEMENTS AND VERDICTS WERE ACHIEVED THROUGH COLLABORATION WITH OUTSIDE ATTORNEYS AND PARTNER LAW FIRMS. NO GUARANTEE OF OUTCOME. RESULTS DEPEND ON UNIQUE FACTS AND THE APPLICABLE LAW OF EACH CASE. OFFICE LOCATIONS AND ADDITIONAL INFORMATION CAN BE FOUND ON WWW.DKLAW.COM."
  },
  {
    "title": "Voiceover",
    "body": "ADVERTISEMENT. DK LAW – INJURY, ACCIDENT, AND MORE, PC, IS A PERSONAL INJURY LAW FIRM, LICENSED IN CALIFORNIA. VOICEOVER IS DONE BY A PAID PROFESSIONAL SPOKESPERSON. PRIOR RESULTS DO NOT GUARANTEE A SIMILAR OUTCOME. OFFICE LOCATIONS AND ADDITIONAL INFORMATION CAN BE FOUND ON WWW.DKLAW.COM."
  },
]

CA_FOOTER_DISCLAIMER = "This is a legal advertisement by DK Law - Injury, Accident, and More, a licensed California law firm. By submitting your information, you agree to be contacted by DK Law and/or its partner attorneys or legal service providers. Results may vary. Past case results do not guarantee future outcomes. Attorneys may work on a contingency fee basis — no fees unless you win. No attorney-client relationship is formed by submitting this form."

updates = {
  'en': {"title": "Disclaimer", "sections": EN_SECTIONS, "close": "Close"},
  'es': {"title": "Aviso Legal", "sections": ES_SECTIONS, "close": "Cerrar"},
  'ca': {"title": "Disclaimer", "sections": CA_SECTIONS, "close": "Close"},
}

for locale, disc in updates.items():
  path = f'd:/lander/messages/{locale}.json'
  with open(path, encoding='utf-8') as f:
    data = json.load(f)
  data['disclaimer'] = disc
  # Update CA footer disclaimer text
  if locale == 'ca':
    data['quiz']['footer']['disclaimer'] = CA_FOOTER_DISCLAIMER
  with open(path, 'wb') as f:
    f.write(json.dumps(data, ensure_ascii=False, indent=2).encode('utf-8'))
  print(f'{locale}: done ({len(disc["sections"])} sections)')
