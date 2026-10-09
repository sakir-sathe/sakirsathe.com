import type { WorkContent, WorkRecord } from "@/types";
import type { TranslatedLocale } from "@/lib/i18n/locales";

type WorkSource = Omit<WorkRecord, "id" | "content"> & WorkContent;

/**
 * Public, anonymized engineering narratives.
 * Flows illustrate generic responsibilities, not internal system designs.
 * No organizations, private products, dates, metrics or private links.
 */
const sourceCaseStudies = [
  {
    slug: "enterprise-digital-records-platform",
    index: "W-01",
    title: "Enterprise Digital Records Platform",
    systemType: "Document-centric enterprise platform",
    domain: "Enterprise Application Architecture",
    summary: "A document-centric enterprise platform supporting ingestion, scanning workflows, metadata, search, storage, retrieval, reporting and downstream integrations.",
    technologies: ["C#", ".NET", "ASP.NET Core", "Blazor", "SQL Server", "Azure Storage", "Azure Functions", "Azure DevOps", "Application Insights", "Git"],
    themes: ["Document workflows", "Cloud modernization", "Searchability", "Operational reliability", "CI/CD", "Production ownership", "Technical leadership"],
    narrativeStatus: "published",
    sections: [
      {
        heading: "System overview",
        body: "Documents are part of a workflow, not just files in a repository. This platform brought together ingestion and scanning, document metadata, search and retrieval, reporting, and the integrations that made records useful to downstream systems.",
      },
      {
        heading: "My contribution",
        body: "I worked across the full technical lifecycle: architecture, backend and frontend implementation, database design, Azure integration, CI/CD, production support and ongoing modernization. I remained hands-on while also providing technical direction, code review and engineering leadership.",
      },
      {
        heading: "Engineering challenge",
        body: "Document-heavy systems sit at the intersection of user workflows, storage, metadata, search, security and long-running operational processes. The challenge was not simply storing files. Documents needed to remain searchable, traceable and usable by downstream workflows, with reliable behavior in production.",
      },
      {
        heading: "Architecture and approach",
        body: "A useful way to describe this type of system is a web interface backed by an ASP.NET Core application and API layer. Business logic coordinates metadata in SQL Server with files in Azure Storage. Background processing and Azure Functions handle asynchronous work, while search and integration boundaries expose information to other workflows. Telemetry and CI/CD support the entire lifecycle. This is a generic flow, not a reproduction of an internal architecture.",
        flow: ["Blazor / web UI", "ASP.NET Core application / API", "Business logic", "SQL Server + Azure Storage", "Background processing / Azure Functions", "Search + downstream integrations", "Telemetry + CI/CD"],
      },
      {
        heading: "Engineering priorities",
        body: "The important boundaries are between document content and metadata, immediate user actions and background work, and the platform and its consumers. Treating these as explicit responsibilities makes it easier to reason about ingestion state, retrieval behavior and production failures without coupling every workflow to storage details.",
      },
      {
        heading: "Lessons and takeaways",
        body: "Document systems are easier to maintain when searchability, traceability and operations are considered alongside the user experience. Cloud modernization is not just a hosting change: it requires attention to delivery, telemetry and the practical work of supporting a system after it is released.",
      },
    ],
  },
  {
    slug: "geospatial-intelligence-platform",
    index: "W-02",
    title: "Geospatial Intelligence Platform",
    systemType: "Spatial data and mapping application",
    domain: "Maps · Spatial Data · Event Processing",
    summary: "A geospatial application combining enterprise location data with interactive maps, spatial queries, configurable layers, geofencing, weather information and automated alerts.",
    technologies: [".NET", "Blazor WebAssembly", "Azure Maps", "SQL Server Spatial", "Azure Functions", "External weather APIs", "Azure", "JavaScript"],
    themes: ["Spatial computing", "Event-driven processing", "Data visualization", "External API integration", "Reliability", "Technical leadership"],
    narrativeStatus: "published",
    sections: [
      {
        heading: "System overview",
        body: "The application brought enterprise location data into an interactive mapping experience. Spatial queries and configurable map layers helped users explore locations, while geofencing, weather information and automated alerts connected what appeared on the map to background processing.",
      },
      {
        heading: "My contribution",
        body: "I led technical implementation while remaining hands-on across backend services, frontend mapping, spatial processing, data transformation, Azure integration and production support.",
      },
      {
        heading: "Engineering challenge",
        body: "A map is only one view of a larger data system. Live external feeds, spatial boundaries, background processing and user-facing visualization need to stay consistent. Differences in data freshness, coordinate representation and processing time make that consistency harder than simply rendering points on a map.",
      },
      {
        heading: "Architecture and approach",
        body: "The generic flow starts with location data stored and queried through SQL Server Spatial, exposed by .NET services and presented with Azure Maps. External weather and event feeds provide additional context. Geofence processing and background workers or Azure Functions connect spatial conditions to targeted notifications. The flow describes responsibilities rather than private integration details.",
        flow: ["Enterprise location data", "SQL Server Spatial", ".NET APIs / services", "Azure Maps + external weather / event feeds", "Geofence processing", "Background workers / Azure Functions", "Targeted notifications"],
      },
      {
        heading: "Engineering priorities",
        body: "Spatial processing, feed ingestion and visualization need clear contracts. A user-facing layer should make data freshness understandable, while background processing needs to account for delayed or unavailable external inputs. Keeping these concerns distinct makes both spatial correctness and operational behavior easier to inspect.",
      },
      {
        heading: "Lessons and takeaways",
        body: "Geospatial software combines data engineering with interface design. Reliable alerts depend on the meaning and freshness of the underlying data, not just the accuracy of a boundary calculation. A clear separation between spatial queries, external feeds and presentation helps keep that complexity manageable.",
      },
    ],
  },
  {
    slug: "ai-help-desk-knowledge-assistant",
    index: "W-03",
    title: "AI Help Desk & Knowledge Assistant",
    systemType: "AI-assisted support and knowledge experience",
    domain: "AI · RAG · Voice Automation",
    summary: "An AI-assisted support experience combining conversational interaction, enterprise knowledge retrieval, voice communication and automated support workflows.",
    technologies: [".NET", "Azure OpenAI", "Azure AI Search", "RAG", "Azure Communication Services", "Azure Functions", "Azure App Service", "Key Vault", "Application Insights", "REST APIs"],
    themes: ["Grounded AI", "Voice workflows", "Enterprise integration", "Observability", "Secure configuration", "Human escalation"],
    narrativeStatus: "published",
    sections: [
      {
        heading: "System overview",
        body: "The assistant combined conversational interaction with enterprise knowledge retrieval and voice communication. The goal was a support experience that could use relevant knowledge and connect to support workflows, rather than a chatbot operating independently of the surrounding system.",
      },
      {
        heading: "My contribution",
        body: "I designed and implemented the orchestration between telephony, retrieval, language models, secure cloud services, downstream APIs and telemetry.",
      },
      {
        heading: "Engineering challenge",
        body: "A useful enterprise AI assistant needs more than generated text. Answers need grounding, integrations need predictable behavior, and configuration needs to remain secure. Voice introduces another interaction boundary, while escalation paths and observability are necessary when the assistant cannot safely complete a request.",
      },
      {
        heading: "Architecture and approach",
        body: "In a generic support flow, voice or user interaction enters a speech and communication layer before reaching orchestration. Retrieval brings relevant enterprise knowledge into the language-model context. The response returns through the interaction channel, with optional downstream support or ticket workflows. Secure configuration and telemetry are cross-cutting concerns, not steps delegated to the model.",
        flow: ["Voice / user interaction", "Speech / communication layer", "Orchestration", "Retrieval + enterprise knowledge", "Language model", "Response", "Optional support / ticket workflow"],
      },
      {
        heading: "Engineering priorities",
        body: "Grounded answers, reliable integrations and human escalation need to be designed together. Keeping retrieval, model interaction and downstream API calls distinct makes it possible to understand where a request failed. Secure service configuration and telemetry provide the operational context that the conversational interface alone cannot show.",
      },
      {
        heading: "Lessons and takeaways",
        body: "The model is one component of a support system. The surrounding engineering determines whether the experience is understandable and supportable. Retrieval quality, explicit workflow boundaries and a route to human help matter as much as the fluency of an answer.",
      },
    ],
  },
  {
    slug: "enterprise-search-ai-data-access",
    index: "W-04",
    title: "Enterprise Search & AI Data Access",
    systemType: "Retrieval and governed data-access architecture",
    domain: "RAG · Search · Structured Data",
    summary: "A retrieval architecture combining enterprise documents, semantic and vector search, and governed structured data so AI assistants can answer using trusted information.",
    technologies: ["Azure OpenAI", "Azure AI Search", "Vector Search", "MongoDB Vector Search", "MCP", "REST", "GraphQL", "Data APIs", ".NET", "Azure Functions"],
    themes: ["RAG", "Grounding", "Structured + unstructured data", "Tool use", "Retrieval quality", "Enterprise governance"],
    narrativeStatus: "published",
    sections: [
      {
        heading: "System overview",
        body: "This retrieval architecture connected two different kinds of information: enterprise documents and governed structured data. Semantic and vector search provided a path into unstructured content, while data interfaces provided access to operational information that should not be answered from model memory alone.",
      },
      {
        heading: "My contribution",
        body: "I worked on ingestion, embeddings, retrieval, structured-data access, API integration, MCP-style tool access, grounding and validation.",
      },
      {
        heading: "Engineering challenge",
        body: "Enterprise questions often require both documents and structured business data. Documents are suited to semantic or vector retrieval, while operational data often needs governed APIs or structured queries. Treating every source as the same kind of search problem can obscure the differences in freshness, access boundaries and the evidence needed for an answer.",
      },
      {
        heading: "Architecture and approach",
        body: "The document path runs through ingestion, chunking and embeddings into a vector or search index. A separate structured-data path uses governed data APIs, REST, GraphQL or MCP-style tool interfaces. Both paths meet at orchestration, which supplies relevant information to a language model for a grounded response. These are generic paths, not internal data schemas or tool definitions.",
        flow: ["Documents → ingestion → chunking / embeddings → vector / search index", "Structured data → governed APIs / REST / GraphQL / MCP", "Both paths → orchestration → language model → grounded response"],
      },
      {
        heading: "Engineering priorities",
        body: "Retrieval quality is not only about finding similar text. It also involves selecting the right source, validating the returned information and respecting the boundary of each data interface. Tool use should make access explicit rather than turn a language model into an unrestricted database client.",
      },
      {
        heading: "Lessons and takeaways",
        body: "Structured and unstructured information complement each other, but they should not lose their distinct access patterns. A grounded response is easier to assess when the retrieval path and the data-access contract are clear. Validation belongs around those interfaces as well as around the final generated answer.",
      },
    ],
  },
  {
    slug: "reporting-data-pipeline-modernization",
    index: "W-05",
    title: "Reporting & Data Pipeline Modernization",
    systemType: "Reporting and data-processing workflows",
    domain: "Data · Reporting · Automation",
    summary: "Modernization of reporting and data-processing workflows, moving manual and legacy processes toward automated, observable cloud-based pipelines.",
    technologies: [".NET", "SQL Server", "Azure Data Factory", "Power BI", "Microsoft Fabric", "Azure Functions", "Azure DevOps", "SSIS", "SSRS"],
    themes: ["Automation", "Legacy modernization", "Data orchestration", "Observability", "Reporting", "Operational reliability"],
    narrativeStatus: "published",
    sections: [
      {
        heading: "System overview",
        body: "The work focused on modernizing reporting and data-processing workflows. Manual execution and legacy processes needed a clearer path toward application-driven orchestration, automated pipelines and observable operations, while reporting remained part of the broader processing lifecycle.",
      },
      {
        heading: "My contribution",
        body: "I worked across application orchestration, SQL, reporting, pipeline execution, semantic-model refresh workflows, CI/CD and production troubleshooting.",
      },
      {
        heading: "Engineering challenge",
        body: "Legacy reporting environments can accumulate manual steps, tightly coupled integrations and limited visibility into execution. The goal was not just to trigger a pipeline automatically. It was to make execution state clearer and operations more repeatable across data transformation, reporting and model refresh.",
      },
      {
        heading: "Architecture and approach",
        body: "A generic application-driven workflow starts with a pipeline trigger and orchestration layer. Azure Data Factory coordinates data processing and SQL transformation, followed by reporting or semantic-model refresh. Status and telemetry make the progression visible to the application and to the people operating it.",
        flow: ["Application", "Pipeline trigger / orchestration", "Azure Data Factory", "Data transformation / SQL", "Reporting / semantic-model refresh", "Status / telemetry"],
      },
      {
        heading: "Engineering priorities",
        body: "A trigger, a completed transformation and an available report are different states. Making those distinctions explicit is important for troubleshooting and for deciding what should happen when a later stage fails. Delivery automation and production support need to account for the workflow as a whole, not just each individual service.",
      },
      {
        heading: "Lessons and takeaways",
        body: "Automation is most useful when execution is also observable. Modernization should make dependencies and state easier to understand, rather than simply move a manual process into a new hosting environment. Reporting reliability depends on the orchestration and data processing that precede the final output.",
      },
    ],
  },
  {
    slug: "cross-platform-product-ai-platform",
    index: "W-06",
    title: "Cross-Platform Product & AI Platform",
    systemType: "Web, mobile and AI-enabled application platform",
    domain: "Web · Mobile · AI-Enabled Applications",
    summary: "Full-stack engineering across connected web and cross-platform mobile products, shared services, enterprise integrations and AI-assisted experiences.",
    technologies: ["Blazor WebAssembly", ".NET MAUI", "Next.js", "TypeScript", "C# / .NET", "Python", "REST / GraphQL / gRPC", "Azure Functions"],
    themes: ["Cross-platform product engineering", "Technical design ownership", "Enterprise integration", "AI-enabled experiences", "Observability", "Production reliability"],
    narrativeStatus: "published",
    sections: [
      {
        heading: "System overview",
        body: "This work represents full-stack product engineering across web and cross-platform mobile experiences. Product capabilities connected user interfaces with shared services, enterprise data and external integrations, with location-aware and AI-assisted experiences where they fit the use case.",
      },
      {
        heading: "My contribution",
        body: "I owned technical design and implementation across frontend, mobile and backend concerns, integrating enterprise UI components and APIs while providing code review, technical guidance and hands-on production support.",
      },
      {
        heading: "Engineering challenge",
        body: "A product spanning browser and mobile clients must balance native interaction expectations with reusable services and dependable data contracts. Authentication, integration behavior, observability and release coordination all affect whether features remain reliable beyond the development environment.",
      },
      {
        heading: "Architecture and approach",
        body: "Different product needs called for different client and service patterns: Blazor WebAssembly and .NET MAUI, alongside Next.js and TypeScript, connected to C#/.NET or Python services. Integrations included REST, GraphQL and gRPC/Protobuf, OAuth 2.0 flows, Azure Functions, and SQL or NoSQL data stores. These describe the breadth of systems and choices, not a claim that every feature used every technology.",
        flow: ["Web and cross-platform mobile clients", "Authentication + enterprise UI components", "REST / GraphQL / gRPC service boundaries", ".NET / Python services + SQL / NoSQL data", "Azure delivery + observability"],
      },
      {
        heading: "Engineering priorities",
        body: "Consistent contracts and authentication flows help client applications evolve without duplicating business behavior. CI/CD, Azure deployments and Application Insights support repeatable releases and production diagnosis; troubleshooting and reliability work remain part of implementation rather than a final handoff.",
      },
      {
        heading: "Lessons and takeaways",
        body: "Cross-platform product work is a coordination problem as much as a framework choice. Clear service boundaries, deliberate component integration and production feedback make it possible to deliver different client experiences while keeping the system maintainable.",
      },
    ],
  },
  {
    slug: "enterprise-appraisal-workflow-platform",
    index: "W-07",
    title: "Enterprise Appraisal & Workflow Platform",
    systemType: "Transactional workflow and business application",
    domain: "Enterprise Application Engineering",
    summary: "A transactional business application supporting appraisal, valuation and related workflows with complex rules, data and operational handoffs.",
    technologies: ["ASP.NET Core", "Angular", "Redux-style state", "REST APIs", "SQL Server", "Kubernetes", "Azure DevOps"],
    themes: ["Transactional workflows", "Feature delivery", "Performance and maintainability", "Production readiness", "Hands-on team leadership", "Engineering quality"],
    narrativeStatus: "published",
    sections: [
      {
        heading: "System overview",
        body: "The platform supported enterprise appraisal and valuation workflows, coordinating detailed business information, review steps and transactional outcomes in a production business application.",
      },
      {
        heading: "My contribution",
        body: "I combined hands-on feature development across ASP.NET Core, Angular and APIs with technical leadership: estimating work, solving difficult engineering problems, reviewing code and mentoring engineers through delivery.",
      },
      {
        heading: "Engineering challenge",
        body: "Workflow-heavy applications need state to remain understandable across user interactions, APIs and persistence. Changes must preserve business rules while improving responsiveness and maintainability, and must be delivered in a form that can be operated reliably.",
      },
      {
        heading: "Architecture and approach",
        body: "A browser application used Angular and Redux-style state management over ASP.NET Core REST APIs, with SQL Server for transactional data. Kubernetes and Azure DevOps supported deployment and delivery practices. This is a high-level description of the engineering pattern, not an internal system design.",
        flow: ["Angular workflow UI", "ASP.NET Core REST APIs", "Business validation + workflow state", "SQL Server", "Kubernetes deployment + Azure DevOps delivery"],
      },
      {
        heading: "Engineering priorities",
        body: "Feature work was balanced with performance, maintainability and production readiness. Estimation, focused technical problem solving, code review and mentoring helped the team deliver changes while keeping shared workflows understandable and supportable.",
      },
      {
        heading: "Lessons and takeaways",
        body: "Transactional enterprise applications benefit from clear state ownership and predictable API boundaries. Leadership is most effective when technical direction stays connected to implementation, delivery constraints and the realities of operating the application.",
      },
    ],
  },
  {
    slug: "complex-product-configuration-platform",
    index: "W-08",
    title: "Complex Product Configuration Platform",
    systemType: "Rule-driven product configuration software",
    domain: "Manufacturing · Product Engineering",
    summary: "Manufacturing workflows for configuring complex products, applying business rules, and producing pricing, order, document and reporting outputs across evolving web applications.",
    technologies: ["ASP.NET MVC / Core", "React", "Redux / Saga", "Angular / AngularJS", "SQL Server", "REST APIs", "Selenium", "Report templating"],
    themes: ["Product configuration", "Manufacturing workflows", "Desktop-to-web modernization", "Business rules", "Technical leadership", "Quality and maintainability"],
    narrativeStatus: "published",
    sections: [
      {
        heading: "System overview",
        body: "Across a broader manufacturing and product-engineering chapter, I worked on complex configurators and enterprise workflows for defining products, validating interdependent choices, and producing pricing, order, document and reporting outputs. Some experiences also involved modernizing desktop-oriented capabilities into web applications.",
      },
      {
        heading: "My contribution",
        body: "My work spanned full-stack implementation, configuration-driven interfaces, validation and business rules, APIs, report generation, UI automation and technical leadership. I contributed to design decisions, estimation, code review, mentoring and iterative delivery with engineering teams.",
      },
      {
        heading: "Engineering challenge",
        body: "Configuration choices often depend on rules elsewhere in a product or workflow. The interface must communicate valid options while authoritative rules remain consistent across APIs, persistence and downstream documents. Modernization adds another constraint: preserve essential business behavior while improving maintainability and delivery.",
      },
      {
        heading: "Architecture and approach",
        body: "The general pattern combines a web interface with application and API layers, SQL-backed business data, reusable configuration rules, and downstream order or reporting workflows. Across different systems, the frontend approaches included ASP.NET MVC/Core, React with Redux/Saga, and Angular-family applications; Selenium supported UI automation. These technologies describe the broader body of work, not one application using every option.",
        flow: ["Configuration-driven web UI", "Application / REST API", "Business rules + validation", "SQL Server / workflow data", "Order, pricing, document + report outputs"],
      },
      {
        heading: "Engineering priorities",
        body: "The interface should make constraints understandable without becoming the source of truth for business rules. Stable API contracts, testable validation, report quality and UI automation all help protect complex workflows as they evolve. Technical guidance and code review support consistent delivery across teams.",
      },
      {
        heading: "Lessons and takeaways",
        body: "Product configurators are long-lived business applications: they must explain complex choices to users and preserve reliable downstream outcomes. Separating interface state from authoritative rules makes modernization safer, while iterative planning, mentoring and review help teams improve systems without losing the domain behavior they depend on.",
      },
    ],
  },
] as const satisfies readonly WorkSource[];

type WorkSlug = (typeof sourceCaseStudies)[number]["slug"];
type WorkTranslations = Record<WorkSlug, Record<TranslatedLocale, WorkContent>>;

const workTranslations = {
  "enterprise-digital-records-platform": {
    es: {
      title: "Plataforma empresarial de documentos digitales", systemType: "Plataforma empresarial centrada en documentos", domain: "Arquitectura de aplicaciones empresariales",
      summary: "Plataforma empresarial centrada en documentos que integra ingestión, flujos de escaneo, metadatos, búsqueda, almacenamiento, recuperación, informes e integraciones con otros sistemas.",
      themes: ["Flujos de documentos", "Modernización en la nube", "Capacidad de búsqueda", "Confiabilidad operativa", "CI/CD", "Responsabilidad en producción", "Liderazgo técnico"],
      sections: [
        { heading: "Resumen del sistema", body: "Los documentos forman parte de un flujo de trabajo, no son solo archivos en un repositorio. Esta plataforma reunió ingestión y escaneo, metadatos, búsqueda y recuperación de documentos, informes e integraciones que permitían aprovechar los registros en sistemas posteriores." },
        { heading: "Mi contribución", body: "Trabajé en todo el ciclo técnico: arquitectura, implementación de backend y frontend, diseño de bases de datos, integración con Azure, CI/CD, soporte en producción y modernización continua. Mantuve un rol práctico y también aporté dirección técnica, revisión de código y liderazgo de ingeniería." },
        { heading: "Reto de ingeniería", body: "Los sistemas con muchos documentos conectan flujos de usuario, almacenamiento, metadatos, búsqueda, seguridad y procesos operativos de larga duración. El reto no era simplemente guardar archivos. Los documentos debían seguir siendo localizables, trazables y útiles para los flujos posteriores, con un comportamiento confiable en producción." },
        { heading: "Arquitectura y enfoque", body: "Una forma útil de describir este tipo de sistema es una interfaz web respaldada por una aplicación y una capa de API de ASP.NET Core. La lógica de negocio coordina los metadatos en SQL Server con los archivos en Azure Storage. El procesamiento en segundo plano y Azure Functions gestionan el trabajo asíncrono, mientras que los límites de búsqueda e integración exponen información a otros flujos. La telemetría y CI/CD respaldan todo el ciclo. Este es un flujo genérico, no una reproducción de una arquitectura interna.", flow: ["Interfaz web de Blazor", "Aplicación / capa de API de ASP.NET Core", "Lógica de negocio", "SQL Server + Azure Storage", "Procesamiento en segundo plano / Azure Functions", "Búsqueda + integraciones posteriores", "Telemetría + CI/CD"] },
        { heading: "Prioridades de ingeniería", body: "Los límites importantes separan el contenido de los documentos de sus metadatos, las acciones inmediatas del usuario del trabajo en segundo plano, y la plataforma de quienes la consumen. Tratar estas áreas como responsabilidades explícitas facilita razonar sobre el estado de ingestión, la recuperación y los fallos en producción sin acoplar cada flujo a los detalles del almacenamiento." },
        { heading: "Aprendizajes", body: "Los sistemas documentales son más fáciles de mantener cuando la capacidad de búsqueda, la trazabilidad y la operación se consideran junto con la experiencia de usuario. Modernizar en la nube no es solo cambiar dónde se aloja el sistema: también requiere atención a la entrega, la telemetría y el soporte práctico después de su publicación." },
      ],
    },
    hi: {
      title: "एंटरप्राइज़ डिजिटल दस्तावेज़ प्लेटफ़ॉर्म", systemType: "दस्तावेज़-केंद्रित एंटरप्राइज़ प्लेटफ़ॉर्म", domain: "एंटरप्राइज़ एप्लिकेशन आर्किटेक्चर",
      summary: "दस्तावेज़-केंद्रित एंटरप्राइज़ प्लेटफ़ॉर्म, जिसमें ingestion, scanning workflows, metadata, search, storage, retrieval, reporting और downstream integrations शामिल हैं।",
      themes: ["दस्तावेज़ वर्कफ़्लो", "क्लाउड आधुनिकीकरण", "खोज क्षमता", "ऑपरेशनल विश्वसनीयता", "CI/CD", "प्रोडक्शन की ज़िम्मेदारी", "तकनीकी नेतृत्व"],
      sections: [
        { heading: "सिस्टम का परिचय", body: "दस्तावेज़ किसी workflow का हिस्सा होते हैं, केवल repository में रखी फ़ाइलें नहीं। इस प्लेटफ़ॉर्म ने ingestion और scanning, document metadata, search और retrieval, reporting तथा उन integrations को जोड़ा जिनसे records downstream systems के लिए उपयोगी बने।" },
        { heading: "मेरा योगदान", body: "मैंने पूरे technical lifecycle में काम किया: architecture, backend और frontend implementation, database design, Azure integration, CI/CD, production support और लगातार modernization। व्यावहारिक implementation के साथ technical direction, code review और engineering leadership भी दी।" },
        { heading: "इंजीनियरिंग चुनौती", body: "बहुत सारे दस्तावेज़ वाले सिस्टम user workflows, storage, metadata, search, security और लंबे operational processes के बीच आते हैं। चुनौती केवल फ़ाइलें store करना नहीं थी। Documents को खोजने योग्य, traceable और downstream workflows के लिए उपयोगी रहना था, साथ ही production में उनका व्यवहार विश्वसनीय होना चाहिए था।" },
        { heading: "आर्किटेक्चर और तरीका", body: "इस प्रकार के सिस्टम को ASP.NET Core application और API layer से समर्थित web interface के रूप में समझा जा सकता है। Business logic, SQL Server में metadata और Azure Storage में files का समन्वय करती है। Background processing और Azure Functions asynchronous work संभालते हैं; search और integration boundaries अन्य workflows को जानकारी देते हैं। Telemetry और CI/CD पूरे lifecycle का समर्थन करते हैं। यह सामान्य flow है, किसी internal architecture की प्रतिलिपि नहीं।", flow: ["Blazor web interface", "ASP.NET Core application / API layer", "Business logic", "SQL Server + Azure Storage", "Background processing / Azure Functions", "Search + downstream integrations", "Telemetry + CI/CD"] },
        { heading: "इंजीनियरिंग प्राथमिकताएँ", body: "मुख्य boundaries document content और metadata, user के तत्काल actions और background work, तथा platform और उसके consumers के बीच हैं। इन्हें स्पष्ट जिम्मेदारियों के रूप में रखने से ingestion state, retrieval behavior और production failures को समझना आसान होता है, बिना हर workflow को storage details से जोड़ने के।" },
        { heading: "सीख और निष्कर्ष", body: "Document systems को बनाए रखना आसान होता है जब searchability, traceability और operations को user experience के साथ ध्यान में रखा जाए। Cloud modernization केवल hosting बदलना नहीं है: delivery, telemetry और release के बाद system को support करने के व्यावहारिक काम पर भी ध्यान देना पड़ता है।" },
      ],
    },
  },
  "geospatial-intelligence-platform": {
    es: {
      title: "Plataforma de inteligencia geoespacial", systemType: "Aplicación de mapas y datos espaciales", domain: "Mapas · Datos espaciales · Procesamiento de eventos",
      summary: "Aplicación geoespacial que combina datos empresariales de ubicación con mapas interactivos, consultas espaciales, capas configurables, geocercas, información meteorológica y alertas automatizadas.",
      themes: ["Computación espacial", "Procesamiento basado en eventos", "Visualización de datos", "Integración de API externas", "Confiabilidad", "Liderazgo técnico"],
      sections: [
        { heading: "Resumen del sistema", body: "La aplicación incorporó datos empresariales de ubicación en una experiencia de mapas interactiva. Las consultas espaciales y las capas configurables ayudaban a explorar ubicaciones, mientras que las geocercas, la información meteorológica y las alertas automatizadas conectaban lo que se veía en el mapa con el procesamiento en segundo plano." },
        { heading: "Mi contribución", body: "Lideré la implementación técnica y trabajé directamente en servicios backend, mapas frontend, procesamiento espacial, transformación de datos, integración con Azure y soporte en producción." },
        { heading: "Reto de ingeniería", body: "Un mapa es solo una vista de un sistema de datos más amplio. Los flujos externos en tiempo real, los límites espaciales, el procesamiento en segundo plano y la visualización deben mantenerse coherentes. La frescura de los datos, la representación de coordenadas y los tiempos de procesamiento hacen que esa coherencia sea más difícil que simplemente mostrar puntos en un mapa." },
        { heading: "Arquitectura y enfoque", body: "El flujo genérico comienza con datos de ubicación almacenados y consultados mediante SQL Server Spatial, expuestos por servicios .NET y presentados con Azure Maps. Los flujos externos de clima y eventos aportan contexto adicional. El procesamiento de geocercas y los workers o Azure Functions conectan las condiciones espaciales con notificaciones dirigidas. El flujo describe responsabilidades, no detalles de integraciones privadas.", flow: ["Datos empresariales de ubicación", "SQL Server Spatial", "APIs / servicios .NET", "Azure Maps + flujos externos de clima / eventos", "Procesamiento de geocercas", "Workers en segundo plano / Azure Functions", "Notificaciones dirigidas"] },
        { heading: "Prioridades de ingeniería", body: "El procesamiento espacial, la ingestión de flujos y la visualización necesitan contratos claros. La interfaz debe comunicar la frescura de los datos, y el procesamiento en segundo plano debe contemplar entradas externas retrasadas o no disponibles. Separar estas responsabilidades facilita revisar tanto la corrección espacial como el comportamiento operativo." },
        { heading: "Aprendizajes", body: "El software geoespacial combina ingeniería de datos y diseño de interfaces. Las alertas confiables dependen del significado y la frescura de los datos, no solo de la precisión de un cálculo de límites. Separar las consultas espaciales, los flujos externos y la presentación ayuda a gestionar esa complejidad." },
      ],
    },
    hi: {
      title: "भू-स्थानिक इंटेलिजेंस प्लेटफ़ॉर्म", systemType: "स्थानिक डेटा और मानचित्रण एप्लिकेशन", domain: "मानचित्र · स्थानिक डेटा · इवेंट प्रोसेसिंग",
      summary: "भू-स्थानिक एप्लिकेशन, जो enterprise location data को interactive maps, spatial queries, configurable layers, geofencing, मौसम जानकारी और स्वचालित alerts से जोड़ता है।",
      themes: ["स्थानिक कंप्यूटिंग", "इवेंट-आधारित प्रोसेसिंग", "डेटा विज़ुअलाइज़ेशन", "बाहरी API एकीकरण", "विश्वसनीयता", "तकनीकी नेतृत्व"],
      sections: [
        { heading: "सिस्टम का परिचय", body: "इस एप्लिकेशन ने enterprise location data को interactive mapping अनुभव में लाया। Spatial queries और configurable map layers से उपयोगकर्ता स्थानों को खोज सकते थे; geofencing, मौसम जानकारी और automated alerts ने map पर दिखने वाली जानकारी को background processing से जोड़ा।" },
        { heading: "मेरा योगदान", body: "मैंने technical implementation का नेतृत्व किया और backend services, frontend mapping, spatial processing, data transformation, Azure integration तथा production support में hands-on काम किया।" },
        { heading: "इंजीनियरिंग चुनौती", body: "Map एक बड़े data system का केवल एक view है। Live external feeds, spatial boundaries, background processing और user-facing visualization में consistency आवश्यक है। Data freshness, coordinate representation और processing time के अंतर के कारण यह केवल map पर points दिखाने से कहीं कठिन है।" },
        { heading: "आर्किटेक्चर और तरीका", body: "सामान्य flow में location data को SQL Server Spatial में store और query किया जाता है, .NET services के माध्यम से उपलब्ध कराया जाता है और Azure Maps में दिखाया जाता है। बाहरी weather और event feeds अतिरिक्त संदर्भ देते हैं। Geofence processing तथा background workers या Azure Functions स्थानिक स्थितियों को targeted notifications से जोड़ते हैं। यह जिम्मेदारियों का सामान्य वर्णन है, निजी integrations का विवरण नहीं।", flow: ["Enterprise location data", "SQL Server Spatial", ".NET APIs / services", "Azure Maps + बाहरी weather / event feeds", "Geofence processing", "Background workers / Azure Functions", "Targeted notifications"] },
        { heading: "इंजीनियरिंग प्राथमिकताएँ", body: "Spatial processing, feed ingestion और visualization के बीच स्पष्ट contracts होने चाहिए। User-facing layer को data freshness समझानी चाहिए; background processing में देर से आने वाले या अनुपलब्ध external inputs का ध्यान होना चाहिए। इन चिंताओं को अलग रखने से spatial correctness और operational behavior की जाँच आसान होती है।" },
        { heading: "सीख और निष्कर्ष", body: "Geospatial software में data engineering और interface design दोनों शामिल हैं। विश्वसनीय alerts underlying data के अर्थ और freshness पर निर्भर करते हैं, केवल boundary calculation की accuracy पर नहीं। Spatial queries, external feeds और presentation को अलग रखने से complexity संभालना आसान होता है।" },
      ],
    },
  },
  "ai-help-desk-knowledge-assistant": {
    es: {
      title: "Asistente de soporte y conocimiento con IA", systemType: "Experiencia de soporte y conocimiento asistida por IA", domain: "IA · RAG · Automatización de voz",
      summary: "Experiencia de soporte asistida por IA que combina conversación, recuperación de conocimiento empresarial, comunicación por voz y flujos automatizados de soporte.",
      themes: ["IA fundamentada", "Flujos de voz", "Integración empresarial", "Observabilidad", "Configuración segura", "Escalamiento a personas"],
      sections: [
        { heading: "Resumen del sistema", body: "El asistente combinó interacción conversacional con recuperación de conocimiento empresarial y comunicación por voz. El objetivo era ofrecer soporte que pudiera utilizar conocimiento pertinente y conectarse con los flujos de atención, no un chatbot aislado del sistema que lo rodeaba." },
        { heading: "Mi contribución", body: "Diseñé e implementé la orquestación entre telefonía, recuperación, modelos de lenguaje, servicios seguros en la nube, APIs posteriores y telemetría." },
        { heading: "Reto de ingeniería", body: "Un asistente empresarial útil necesita más que texto generado. Las respuestas deben estar fundamentadas, las integraciones deben comportarse de forma predecible y la configuración debe mantenerse segura. La voz añade otro límite de interacción, mientras que las opciones de escalamiento y la observabilidad son necesarias cuando el asistente no puede completar una solicitud de forma segura." },
        { heading: "Arquitectura y enfoque", body: "En un flujo genérico de soporte, la interacción de voz o del usuario pasa por una capa de comunicación y voz antes de llegar a la orquestación. La recuperación aporta conocimiento empresarial pertinente al contexto del modelo de lenguaje. La respuesta vuelve por el canal de interacción, con flujos opcionales de soporte o tickets. La configuración segura y la telemetría son preocupaciones transversales, no pasos delegados al modelo.", flow: ["Interacción de voz / usuario", "Capa de voz / comunicación", "Orquestación", "Recuperación + conocimiento empresarial", "Modelo de lenguaje", "Respuesta", "Flujo opcional de soporte / tickets"] },
        { heading: "Prioridades de ingeniería", body: "Las respuestas fundamentadas, las integraciones confiables y el escalamiento a personas deben diseñarse en conjunto. Separar la recuperación, la interacción con el modelo y las llamadas a APIs posteriores permite entender dónde falló una solicitud. La configuración segura de servicios y la telemetría aportan el contexto operativo que la interfaz conversacional por sí sola no muestra." },
        { heading: "Aprendizajes", body: "El modelo es un componente del sistema de soporte. La ingeniería que lo rodea determina si la experiencia es comprensible y sostenible. La calidad de recuperación, los límites explícitos del flujo y una vía para solicitar ayuda humana importan tanto como la fluidez de la respuesta." },
      ],
    },
    hi: {
      title: "AI हेल्प डेस्क और ज्ञान सहायक", systemType: "AI-सहायित सहायता और ज्ञान अनुभव", domain: "AI · RAG · वॉइस ऑटोमेशन",
      summary: "AI-सहायित support अनुभव, जो बातचीत, enterprise knowledge retrieval, voice communication और automated support workflows को जोड़ता है।",
      themes: ["Grounded AI", "वॉइस वर्कफ़्लो", "एंटरप्राइज़ एकीकरण", "ऑब्ज़र्वेबिलिटी", "सुरक्षित कॉन्फ़िगरेशन", "मानवीय सहायता तक escalation"],
      sections: [
        { heading: "सिस्टम का परिचय", body: "इस assistant ने conversational interaction को enterprise knowledge retrieval और voice communication के साथ जोड़ा। उद्देश्य ऐसा support अनुभव था जो प्रासंगिक ज्ञान का उपयोग कर सके और support workflows से जुड़ सके, न कि आसपास के सिस्टम से अलग chatbot।" },
        { heading: "मेरा योगदान", body: "मैंने telephony, retrieval, language models, सुरक्षित cloud services, downstream APIs और telemetry के बीच orchestration डिज़ाइन और लागू किया।" },
        { heading: "इंजीनियरिंग चुनौती", body: "एक उपयोगी enterprise AI assistant को generated text से अधिक चाहिए। उत्तरों का grounding होना चाहिए, integrations का व्यवहार predictable होना चाहिए और configuration सुरक्षित रहनी चाहिए। Voice एक और interaction boundary जोड़ता है; जब assistant सुरक्षित रूप से request पूरी न कर सके, तब escalation और observability आवश्यक हैं।" },
        { heading: "आर्किटेक्चर और तरीका", body: "सामान्य support flow में voice या user interaction, orchestration तक पहुँचने से पहले speech और communication layer से गुजरता है। Retrieval, language-model context में प्रासंगिक enterprise knowledge लाता है। उत्तर उसी interaction channel से लौटता है; आवश्यकता पर downstream support या ticket workflows चल सकते हैं। सुरक्षित configuration और telemetry पूरे सिस्टम की चिंताएँ हैं, model को सौंपे गए चरण नहीं।", flow: ["Voice / user interaction", "Speech / communication layer", "Orchestration", "Retrieval + enterprise knowledge", "Language model", "उत्तर", "वैकल्पिक support / ticket workflow"] },
        { heading: "इंजीनियरिंग प्राथमिकताएँ", body: "Grounded answers, विश्वसनीय integrations और human escalation को साथ डिज़ाइन करना चाहिए। Retrieval, model interaction और downstream API calls अलग रखने से request की विफलता का स्थान समझना संभव होता है। सुरक्षित service configuration और telemetry वह operational context देती हैं जो conversational interface अकेला नहीं दिखा सकता।" },
        { heading: "सीख और निष्कर्ष", body: "Model, support system का एक component है। उसके आसपास की engineering तय करती है कि अनुभव समझने और support करने योग्य है या नहीं। Retrieval quality, स्पष्ट workflow boundaries और human help तक पहुँच, उत्तर की सहजता जितनी ही महत्वपूर्ण हैं।" },
      ],
    },
  },
  "enterprise-search-ai-data-access": {
    es: {
      title: "Búsqueda empresarial y acceso a datos con IA", systemType: "Arquitectura de recuperación y acceso gobernado a datos", domain: "RAG · Búsqueda · Datos estructurados",
      summary: "Arquitectura de recuperación que combina documentos empresariales, búsqueda semántica y vectorial, y datos estructurados gobernados para que los asistentes de IA respondan con información confiable.",
      themes: ["RAG", "Fundamentación", "Datos estructurados y no estructurados", "Uso de herramientas", "Calidad de recuperación", "Gobernanza empresarial"],
      sections: [
        { heading: "Resumen del sistema", body: "Esta arquitectura de recuperación conectó dos tipos distintos de información: documentos empresariales y datos estructurados gobernados. La búsqueda semántica y vectorial ofrecía acceso al contenido no estructurado, mientras que las interfaces de datos permitían consultar información operativa que no debía obtenerse únicamente de la memoria del modelo." },
        { heading: "Mi contribución", body: "Trabajé en ingestión, embeddings, recuperación, acceso a datos estructurados, integración de API, acceso a herramientas de estilo MCP, fundamentación y validación." },
        { heading: "Reto de ingeniería", body: "Las preguntas empresariales suelen requerir tanto documentos como datos de negocio estructurados. Los documentos son adecuados para la recuperación semántica o vectorial; los datos operativos suelen requerir APIs gobernadas o consultas estructuradas. Tratar todas las fuentes como el mismo problema de búsqueda puede ocultar diferencias de frescura, límites de acceso y evidencia necesaria para responder." },
        { heading: "Arquitectura y enfoque", body: "La ruta documental pasa por ingestión, fragmentación y embeddings hacia un índice vectorial o de búsqueda. Una ruta separada de datos estructurados utiliza APIs gobernadas, REST, GraphQL o interfaces de herramientas de estilo MCP. Ambas convergen en la orquestación, que proporciona información pertinente al modelo de lenguaje para una respuesta fundamentada. Son rutas genéricas, no esquemas de datos ni definiciones de herramientas internas.", flow: ["Documentos → ingestión → fragmentación / embeddings → índice vectorial / búsqueda", "Datos estructurados → APIs gobernadas / REST / GraphQL / MCP", "Ambas rutas → orquestación → modelo de lenguaje → respuesta fundamentada"] },
        { heading: "Prioridades de ingeniería", body: "La calidad de recuperación no consiste únicamente en encontrar texto parecido. También implica elegir la fuente adecuada, validar la información obtenida y respetar los límites de cada interfaz de datos. El uso de herramientas debe hacer explícito el acceso, no convertir el modelo de lenguaje en un cliente de base de datos sin restricciones." },
        { heading: "Aprendizajes", body: "La información estructurada y no estructurada se complementa, pero debe conservar sus patrones de acceso distintos. Es más fácil evaluar una respuesta fundamentada cuando la ruta de recuperación y el contrato de acceso a datos son claros. La validación corresponde tanto alrededor de esas interfaces como alrededor de la respuesta generada." },
      ],
    },
    hi: {
      title: "एंटरप्राइज़ सर्च और AI डेटा एक्सेस", systemType: "Retrieval और नियंत्रित डेटा-एक्सेस आर्किटेक्चर", domain: "RAG · Search · Structured data",
      summary: "Retrieval architecture, जो enterprise documents, semantic और vector search तथा नियंत्रित structured data को जोड़ती है, ताकि AI assistants विश्वसनीय जानकारी के आधार पर उत्तर दें।",
      themes: ["RAG", "Grounding", "Structured और unstructured data", "Tool use", "Retrieval quality", "Enterprise governance"],
      sections: [
        { heading: "सिस्टम का परिचय", body: "इस retrieval architecture ने दो तरह की जानकारी जोड़ी: enterprise documents और नियंत्रित structured data। Semantic और vector search ने unstructured content तक पहुँच दी, जबकि data interfaces ने operational information उपलब्ध कराई जिसका उत्तर केवल model memory पर आधारित नहीं होना चाहिए।" },
        { heading: "मेरा योगदान", body: "मैंने ingestion, embeddings, retrieval, structured-data access, API integration, MCP-style tool access, grounding और validation पर काम किया।" },
        { heading: "इंजीनियरिंग चुनौती", body: "Enterprise सवालों के लिए अक्सर documents और structured business data दोनों चाहिए। Documents semantic या vector retrieval के लिए उपयुक्त हैं; operational data के लिए अक्सर governed APIs या structured queries चाहिए। हर source को एक ही search problem मानने से freshness, access boundaries और उत्तर के लिए आवश्यक evidence के अंतर छिप सकते हैं।" },
        { heading: "आर्किटेक्चर और तरीका", body: "Document path में ingestion, chunking और embeddings के बाद vector या search index आता है। अलग structured-data path governed data APIs, REST, GraphQL या MCP-style tool interfaces का उपयोग करता है। दोनों paths orchestration में मिलते हैं, जो grounded response के लिए language model को प्रासंगिक जानकारी देता है। ये सामान्य paths हैं, internal data schemas या tool definitions नहीं।", flow: ["Documents → ingestion → chunking / embeddings → vector / search index", "Structured data → governed APIs / REST / GraphQL / MCP", "दोनों paths → orchestration → language model → grounded response"] },
        { heading: "इंजीनियरिंग प्राथमिकताएँ", body: "Retrieval quality केवल मिलता-जुलता text खोजने के बारे में नहीं है। इसमें सही source चुनना, प्राप्त जानकारी validate करना और हर data interface की सीमा का सम्मान करना भी शामिल है। Tool use को access स्पष्ट करना चाहिए, language model को unrestricted database client नहीं बनाना चाहिए।" },
        { heading: "सीख और निष्कर्ष", body: "Structured और unstructured जानकारी एक-दूसरे की पूरक हैं, लेकिन उनके access patterns अलग रहने चाहिए। Retrieval path और data-access contract स्पष्ट हों तो grounded response का आकलन आसान होता है। Validation उन interfaces और अंत में बने उत्तर—दोनों के आसपास आवश्यक है।" },
      ],
    },
  },
  "reporting-data-pipeline-modernization": {
    es: {
      title: "Modernización de informes y flujos de datos", systemType: "Flujos de informes y procesamiento de datos", domain: "Datos · Informes · Automatización",
      summary: "Modernización de flujos de informes y procesamiento de datos para pasar de procesos manuales y heredados a pipelines automatizados y observables en la nube.",
      themes: ["Automatización", "Modernización de sistemas heredados", "Orquestación de datos", "Observabilidad", "Informes", "Confiabilidad operativa"],
      sections: [
        { heading: "Resumen del sistema", body: "El trabajo se centró en modernizar flujos de informes y procesamiento de datos. La ejecución manual y los procesos heredados necesitaban una ruta más clara hacia la orquestación desde aplicaciones, pipelines automatizados y operaciones observables, manteniendo los informes dentro del ciclo general de procesamiento." },
        { heading: "Mi contribución", body: "Trabajé en orquestación de aplicaciones, SQL, informes, ejecución de pipelines, flujos de actualización de modelos semánticos, CI/CD y resolución de problemas en producción." },
        { heading: "Reto de ingeniería", body: "Los entornos heredados de informes pueden acumular pasos manuales, integraciones estrechamente acopladas y poca visibilidad de la ejecución. El objetivo no era solo iniciar un pipeline automáticamente, sino aclarar su estado y hacer más repetibles las operaciones de transformación de datos, informes y actualización de modelos." },
        { heading: "Arquitectura y enfoque", body: "Un flujo genérico impulsado por una aplicación comienza con un disparador de pipeline y una capa de orquestación. Azure Data Factory coordina el procesamiento de datos y las transformaciones SQL, seguidos por los informes o la actualización del modelo semántico. El estado y la telemetría hacen visible el avance para la aplicación y para quienes operan el sistema.", flow: ["Aplicación", "Disparador de pipeline / orquestación", "Azure Data Factory", "Transformación de datos / SQL", "Informes / actualización de modelo semántico", "Estado / telemetría"] },
        { heading: "Prioridades de ingeniería", body: "Un disparador, una transformación terminada y un informe disponible son estados distintos. Hacer explícitas esas diferencias es importante para diagnosticar problemas y decidir qué ocurre si falla una etapa posterior. La automatización de entrega y el soporte en producción deben contemplar el flujo completo, no solo cada servicio por separado." },
        { heading: "Aprendizajes", body: "La automatización aporta más cuando la ejecución también es observable. La modernización debe facilitar la comprensión de dependencias y estados, no limitarse a trasladar un proceso manual a otro entorno de alojamiento. La confiabilidad de los informes depende de la orquestación y del procesamiento de datos previos al resultado final." },
      ],
    },
    hi: {
      title: "रिपोर्टिंग और डेटा पाइपलाइन आधुनिकीकरण", systemType: "रिपोर्टिंग और डेटा-प्रोसेसिंग वर्कफ़्लो", domain: "डेटा · रिपोर्टिंग · ऑटोमेशन",
      summary: "रिपोर्टिंग और data-processing workflows का आधुनिकीकरण, जिसमें manual और legacy processes से automated, observable cloud-based pipelines की ओर बढ़ना शामिल है।",
      themes: ["ऑटोमेशन", "Legacy modernization", "डेटा orchestration", "ऑब्ज़र्वेबिलिटी", "रिपोर्टिंग", "ऑपरेशनल विश्वसनीयता"],
      sections: [
        { heading: "सिस्टम का परिचय", body: "यह काम reporting और data-processing workflows के आधुनिकीकरण पर केंद्रित था। Manual execution और legacy processes के लिए application-driven orchestration, automated pipelines और observable operations की स्पष्ट राह चाहिए थी; reporting व्यापक processing lifecycle का हिस्सा बना रहा।" },
        { heading: "मेरा योगदान", body: "मैंने application orchestration, SQL, reporting, pipeline execution, semantic-model refresh workflows, CI/CD और production troubleshooting पर काम किया।" },
        { heading: "इंजीनियरिंग चुनौती", body: "Legacy reporting environments में manual steps, tightly coupled integrations और execution की सीमित visibility जमा हो सकती है। लक्ष्य केवल pipeline को automatically trigger करना नहीं था। Data transformation, reporting और model refresh में execution state स्पष्ट और operations दोहराने योग्य बनाना भी आवश्यक था।" },
        { heading: "आर्किटेक्चर और तरीका", body: "सामान्य application-driven workflow pipeline trigger और orchestration layer से शुरू होता है। Azure Data Factory data processing और SQL transformation को coordinate करता है, फिर reporting या semantic-model refresh होता है। Status और telemetry application तथा operators के लिए प्रगति स्पष्ट करते हैं।", flow: ["Application", "Pipeline trigger / orchestration", "Azure Data Factory", "Data transformation / SQL", "Reporting / semantic-model refresh", "Status / telemetry"] },
        { heading: "इंजीनियरिंग प्राथमिकताएँ", body: "Trigger होना, transformation पूरा होना और report उपलब्ध होना अलग-अलग states हैं। Troubleshooting और बाद का चरण विफल होने पर अगली कार्रवाई तय करने के लिए यह अंतर स्पष्ट होना चाहिए। Delivery automation और production support को हर service के बजाय पूरे workflow को ध्यान में रखना चाहिए।" },
        { heading: "सीख और निष्कर्ष", body: "Automation तब अधिक उपयोगी है जब execution भी observable हो। Modernization से dependencies और state समझना आसान होना चाहिए; केवल manual process को नए hosting environment में ले जाना पर्याप्त नहीं। Reporting की reliability, अंतिम output से पहले होने वाली orchestration और data processing पर निर्भर करती है।" },
      ],
    },
  },
  "cross-platform-product-ai-platform": {
    es: {
      title: "Plataforma de producto multiplataforma e IA", systemType: "Plataforma de aplicaciones web, móviles y con IA", domain: "Web · Móvil · Aplicaciones con IA",
      summary: "Ingeniería full stack para productos web y móviles multiplataforma conectados, servicios compartidos, integraciones empresariales y experiencias asistidas por IA.",
      themes: ["Ingeniería de productos multiplataforma", "Responsabilidad del diseño técnico", "Integración empresarial", "Experiencias con IA", "Observabilidad", "Confiabilidad en producción"],
      sections: [
        { heading: "Resumen del sistema", body: "Este trabajo abarca ingeniería de producto full stack para experiencias web y móviles multiplataforma. Las capacidades conectaban interfaces de usuario con servicios compartidos, datos empresariales e integraciones externas, además de experiencias basadas en ubicación y asistidas por IA cuando eran adecuadas para el caso de uso." },
        { heading: "Mi contribución", body: "Asumí la responsabilidad del diseño técnico y la implementación en frontend, móvil y backend, integrando componentes de interfaz empresarial y APIs, además de aportar revisión de código, orientación técnica y soporte práctico en producción." },
        { heading: "Reto de ingeniería", body: "Un producto que abarca clientes web y móviles debe equilibrar las expectativas de interacción propias de cada plataforma con servicios reutilizables y contratos de datos confiables. La autenticación, el comportamiento de las integraciones, la observabilidad y la coordinación de versiones determinan si las funciones siguen siendo confiables fuera del entorno de desarrollo." },
        { heading: "Arquitectura y enfoque", body: "Las necesidades de cada producto requerían distintos patrones de cliente y servicio: Blazor WebAssembly y .NET MAUI, junto con Next.js y TypeScript, conectados a servicios C#/.NET o Python. Las integraciones incluyeron REST, GraphQL y gRPC/Protobuf, flujos OAuth 2.0, Azure Functions y almacenes SQL o NoSQL. Esto describe la variedad de sistemas y opciones, no afirma que cada función usara todas las tecnologías.", flow: ["Clientes web y móviles multiplataforma", "Autenticación + componentes de interfaz empresarial", "Límites de servicios REST / GraphQL / gRPC", "Servicios .NET / Python + datos SQL / NoSQL", "Entrega en Azure + observabilidad"] },
        { heading: "Prioridades de ingeniería", body: "Los contratos coherentes y los flujos de autenticación permiten evolucionar las aplicaciones cliente sin duplicar el comportamiento de negocio. CI/CD, las implementaciones en Azure y Application Insights respaldan versiones repetibles y el diagnóstico en producción; la resolución de problemas y la confiabilidad forman parte de la implementación, no de una entrega final." },
        { heading: "Aprendizajes", body: "El trabajo de producto multiplataforma también es un problema de coordinación, no solo una elección de framework. Los límites claros de servicio, la integración deliberada de componentes y la retroalimentación de producción permiten ofrecer experiencias distintas sin perder mantenibilidad." },
      ],
    },
    hi: {
      title: "क्रॉस-प्लेटफ़ॉर्म उत्पाद और AI प्लेटफ़ॉर्म", systemType: "Web, mobile और AI-सक्षम एप्लिकेशन प्लेटफ़ॉर्म", domain: "Web · Mobile · AI-सक्षम एप्लिकेशन",
      summary: "जुड़े हुए web और cross-platform mobile products, साझा services, enterprise integrations और AI-सहायित अनुभवों में full-stack engineering।",
      themes: ["Cross-platform product engineering", "Technical design की ज़िम्मेदारी", "Enterprise integration", "AI-सक्षम अनुभव", "ऑब्ज़र्वेबिलिटी", "Production reliability"],
      sections: [
        { heading: "सिस्टम का परिचय", body: "इस काम में web और cross-platform mobile अनुभवों के लिए full-stack product engineering शामिल थी। Product capabilities ने user interfaces को shared services, enterprise data और external integrations से जोड़ा; use case के अनुसार location-aware और AI-सहायित अनुभव भी शामिल थे।" },
        { heading: "मेरा योगदान", body: "मैंने frontend, mobile और backend में technical design तथा implementation की ज़िम्मेदारी ली। Enterprise UI components और APIs integrate किए, साथ ही code review, technical guidance और hands-on production support दिया।" },
        { heading: "इंजीनियरिंग चुनौती", body: "Browser और mobile clients वाले product को platform के native interaction expectations, reusable services और भरोसेमंद data contracts के बीच संतुलन बनाना होता है। Authentication, integration behavior, observability और release coordination तय करते हैं कि features development environment के बाहर भी विश्वसनीय रहें।" },
        { heading: "आर्किटेक्चर और तरीका", body: "अलग product needs के लिए अलग client और service patterns अपनाए गए: Blazor WebAssembly और .NET MAUI के साथ Next.js और TypeScript, जो C#/.NET या Python services से जुड़े थे। Integrations में REST, GraphQL और gRPC/Protobuf, OAuth 2.0 flows, Azure Functions तथा SQL या NoSQL data stores शामिल थे। यह systems और विकल्पों की व्यापकता बताता है, यह दावा नहीं कि हर feature ने हर technology इस्तेमाल की।", flow: ["Web और cross-platform mobile clients", "Authentication + enterprise UI components", "REST / GraphQL / gRPC service boundaries", ".NET / Python services + SQL / NoSQL data", "Azure delivery + observability"] },
        { heading: "इंजीनियरिंग प्राथमिकताएँ", body: "Consistent contracts और authentication flows से client applications business behavior दोहराए बिना विकसित हो सकती हैं। CI/CD, Azure deployments और Application Insights repeatable releases तथा production diagnosis में मदद करते हैं; troubleshooting और reliability implementation का हिस्सा हैं, अंतिम handoff का काम नहीं।" },
        { heading: "सीख और निष्कर्ष", body: "Cross-platform product work framework चुनने जितना ही coordination का सवाल है। स्पष्ट service boundaries, सोच-समझकर component integration और production feedback से अलग-अलग client अनुभव देते हुए system को maintainable रखा जा सकता है।" },
      ],
    },
  },
  "enterprise-appraisal-workflow-platform": {
    es: {
      title: "Plataforma empresarial de valoración y flujos de trabajo", systemType: "Aplicación empresarial transaccional y de flujos de trabajo", domain: "Ingeniería de aplicaciones empresariales",
      summary: "Aplicación empresarial transaccional para procesos de valoración y tareas relacionadas, con reglas, datos y traspasos operativos complejos.",
      themes: ["Flujos transaccionales", "Entrega de funcionalidades", "Rendimiento y mantenibilidad", "Preparación para producción", "Liderazgo práctico de equipos", "Calidad de ingeniería"],
      sections: [
        { heading: "Resumen del sistema", body: "La plataforma respaldaba flujos empresariales de tasación y valoración, coordinando información de negocio detallada, etapas de revisión y resultados transaccionales en una aplicación de producción." },
        { heading: "Mi contribución", body: "Combiné el desarrollo práctico de funcionalidades con ASP.NET Core, Angular y APIs con liderazgo técnico: estimación del trabajo, resolución de problemas complejos, revisión de código y mentoría durante la entrega." },
        { heading: "Reto de ingeniería", body: "Las aplicaciones centradas en flujos de trabajo necesitan mantener el estado comprensible entre las interacciones de usuario, las APIs y la persistencia. Los cambios deben respetar las reglas de negocio y, a la vez, mejorar la capacidad de respuesta y la mantenibilidad, además de poder operarse de forma confiable." },
        { heading: "Arquitectura y enfoque", body: "Una aplicación de navegador utilizaba Angular y gestión de estado de estilo Redux sobre APIs REST de ASP.NET Core, con SQL Server para los datos transaccionales. Kubernetes y Azure DevOps respaldaban las prácticas de entrega e implementación. Esta es una descripción de alto nivel del patrón de ingeniería, no un diseño interno.", flow: ["Interfaz de flujos Angular", "APIs REST de ASP.NET Core", "Validación de negocio + estado del flujo", "SQL Server", "Implementación en Kubernetes + entrega con Azure DevOps"] },
        { heading: "Prioridades de ingeniería", body: "El desarrollo de funcionalidades se equilibró con el rendimiento, la mantenibilidad y la preparación para producción. La estimación, la resolución enfocada de problemas, la revisión de código y la mentoría ayudaron al equipo a entregar cambios manteniendo los flujos compartidos comprensibles y sostenibles." },
        { heading: "Aprendizajes", body: "Las aplicaciones empresariales transaccionales se benefician de una propiedad del estado clara y límites de API predecibles. El liderazgo es más eficaz cuando la dirección técnica permanece conectada con la implementación, las restricciones de entrega y la realidad de operar la aplicación." },
      ],
    },
    hi: {
      title: "एंटरप्राइज़ मूल्यांकन और वर्कफ़्लो प्लेटफ़ॉर्म", systemType: "Transactional workflow और business application", domain: "एंटरप्राइज़ एप्लिकेशन इंजीनियरिंग",
      summary: "जटिल नियमों, डेटा और operational handoffs के साथ appraisal, valuation और संबंधित workflows संभालने वाला transactional business application।",
      themes: ["Transactional workflows", "Feature delivery", "Performance और maintainability", "Production readiness", "Hands-on team leadership", "Engineering quality"],
      sections: [
        { heading: "सिस्टम का परिचय", body: "इस platform ने enterprise appraisal और valuation workflows को support किया। Production business application में विस्तृत business information, review steps और transactional outcomes का समन्वय किया जाता था।" },
        { heading: "मेरा योगदान", body: "मैंने ASP.NET Core, Angular और APIs पर hands-on feature development के साथ technical leadership की: काम का अनुमान, कठिन engineering समस्याओं का समाधान, code review और delivery के दौरान engineers को mentor करना।" },
        { heading: "इंजीनियरिंग चुनौती", body: "Workflow-heavy applications में user interactions, APIs और persistence के बीच state समझने योग्य रहनी चाहिए। Changes को business rules सुरक्षित रखते हुए responsiveness और maintainability बेहतर करनी होती है, और application को विश्वसनीय रूप से operate करने योग्य बनाना होता है।" },
        { heading: "आर्किटेक्चर और तरीका", body: "Browser application में Angular और Redux-style state management, ASP.NET Core REST APIs के ऊपर उपयोग हुआ; transactional data के लिए SQL Server था। Kubernetes और Azure DevOps ने deployment तथा delivery practices का समर्थन किया। यह engineering pattern का उच्च-स्तरीय वर्णन है, internal system design नहीं।", flow: ["Angular workflow UI", "ASP.NET Core REST APIs", "Business validation + workflow state", "SQL Server", "Kubernetes deployment + Azure DevOps delivery"] },
        { heading: "इंजीनियरिंग प्राथमिकताएँ", body: "Feature work को performance, maintainability और production readiness के साथ संतुलित किया गया। Estimation, focused technical problem solving, code review और mentoring से team ने shared workflows को समझने और support करने योग्य रखते हुए changes deliver किए।" },
        { heading: "सीख और निष्कर्ष", body: "Transactional enterprise applications को state ownership की स्पष्टता और predictable API boundaries से लाभ मिलता है। Technical direction जब implementation, delivery constraints और application चलाने की वास्तविकताओं से जुड़ी रहती है, तब leadership अधिक प्रभावी होती है।" },
      ],
    },
  },
  "complex-product-configuration-platform": {
    es: {
      title: "Plataforma de configuración de productos complejos", systemType: "Software de configuración de productos basado en reglas", domain: "Manufactura · Ingeniería de producto",
      summary: "Flujos de manufactura para configurar productos complejos, aplicar reglas de negocio y generar precios, pedidos, documentos e informes en aplicaciones web en evolución.",
      themes: ["Configuración de productos", "Flujos de manufactura", "Modernización de escritorio a web", "Reglas de negocio", "Liderazgo técnico", "Calidad y mantenibilidad"],
      sections: [
        { heading: "Resumen del sistema", body: "Durante una etapa más amplia de manufactura e ingeniería de producto, trabajé en configuradores complejos y flujos empresariales para definir productos, validar opciones interdependientes y generar resultados de precios, pedidos, documentos e informes. Algunas experiencias también incluyeron modernizar capacidades orientadas al escritorio en aplicaciones web." },
        { heading: "Mi contribución", body: "Mi trabajo abarcó implementación full stack, interfaces basadas en configuración, validación y reglas de negocio, APIs, generación de informes, automatización de interfaz y liderazgo técnico. Contribuí a decisiones de diseño, estimación, revisión de código, mentoría y entrega iterativa con equipos de ingeniería." },
        { heading: "Reto de ingeniería", body: "Las opciones de configuración suelen depender de reglas en otras partes del producto o del flujo. La interfaz debe comunicar opciones válidas, mientras las reglas autoritativas se mantienen coherentes entre APIs, persistencia y documentos posteriores. La modernización añade otra condición: conservar el comportamiento de negocio esencial y mejorar la mantenibilidad y la entrega." },
        { heading: "Arquitectura y enfoque", body: "El patrón general combina una interfaz web con capas de aplicación y API, datos de negocio respaldados por SQL, reglas de configuración reutilizables y flujos posteriores de pedidos o informes. En distintos sistemas, los enfoques frontend incluyeron ASP.NET MVC/Core, React con Redux/Saga y aplicaciones de la familia Angular; Selenium respaldó la automatización de interfaz. Estas tecnologías describen el conjunto del trabajo, no una aplicación que utilizara todas las opciones.", flow: ["Interfaz web basada en configuración", "Aplicación / API REST", "Reglas de negocio + validación", "SQL Server / datos del flujo", "Resultados de pedidos, precios, documentos e informes"] },
        { heading: "Prioridades de ingeniería", body: "La interfaz debe explicar las restricciones sin convertirse en la fuente de verdad de las reglas de negocio. Los contratos de API estables, la validación comprobable, la calidad de los informes y la automatización de interfaz ayudan a proteger flujos complejos mientras evolucionan. La orientación técnica y la revisión de código respaldan una entrega coherente entre equipos." },
        { heading: "Aprendizajes", body: "Los configuradores de productos son aplicaciones empresariales de larga vida: deben explicar opciones complejas y preservar resultados posteriores confiables. Separar el estado de la interfaz de las reglas autoritativas hace más segura la modernización; la planificación iterativa, la mentoría y la revisión ayudan a mejorar los sistemas sin perder el comportamiento de dominio necesario." },
      ],
    },
    hi: {
      title: "जटिल उत्पाद कॉन्फ़िगरेशन प्लेटफ़ॉर्म", systemType: "नियम-आधारित product configuration software", domain: "Manufacturing · Product engineering",
      summary: "जटिल उत्पाद configure करने, business rules लागू करने और विकसित होती web applications में pricing, order, document तथा reporting outputs बनाने वाले manufacturing workflows।",
      themes: ["Product configuration", "Manufacturing workflows", "Desktop से web modernization", "Business rules", "तकनीकी नेतृत्व", "गुणवत्ता और maintainability"],
      sections: [
        { heading: "सिस्टम का परिचय", body: "Manufacturing और product-engineering के व्यापक काम के दौरान मैंने complex configurators और enterprise workflows पर काम किया। इनमें products परिभाषित करना, परस्पर निर्भर विकल्प validate करना और pricing, order, document तथा reporting outputs बनाना शामिल था। कुछ अनुभवों में desktop-oriented capabilities को web applications में आधुनिक बनाना भी शामिल था।" },
        { heading: "मेरा योगदान", body: "मेरे काम में full-stack implementation, configuration-driven interfaces, validation और business rules, APIs, report generation, UI automation तथा technical leadership शामिल थे। मैंने design decisions, estimation, code review, mentoring और engineering teams के साथ iterative delivery में योगदान दिया।" },
        { heading: "इंजीनियरिंग चुनौती", body: "Configuration विकल्प अक्सर product या workflow के अन्य हिस्सों के rules पर निर्भर होते हैं। Interface को valid options समझाने चाहिए, जबकि authoritative rules APIs, persistence और downstream documents में consistent रहें। Modernization की एक और बाध्यता है: maintainability और delivery सुधारते हुए आवश्यक business behavior सुरक्षित रखना।" },
        { heading: "आर्किटेक्चर और तरीका", body: "सामान्य pattern में web interface, application और API layers, SQL-backed business data, reusable configuration rules तथा downstream order या reporting workflows होते हैं। अलग systems में frontend approaches ASP.NET MVC/Core, Redux/Saga के साथ React, और Angular-family applications थे; Selenium ने UI automation को support किया। ये technologies व्यापक काम का वर्णन हैं, किसी एक application में सभी विकल्पों के उपयोग का दावा नहीं।", flow: ["Configuration-driven web UI", "Application / REST API", "Business rules + validation", "SQL Server / workflow data", "Order, pricing, document + report outputs"] },
        { heading: "इंजीनियरिंग प्राथमिकताएँ", body: "Interface को constraints समझाने चाहिए, लेकिन business rules का source of truth नहीं बनना चाहिए। Stable API contracts, testable validation, report quality और UI automation विकसित होते workflows की रक्षा करते हैं। Technical guidance और code review teams के बीच consistent delivery का समर्थन करते हैं।" },
        { heading: "सीख और निष्कर्ष", body: "Product configurators लंबे समय तक चलने वाले business applications हैं: उन्हें जटिल विकल्प समझाने और downstream परिणामों को विश्वसनीय रखने की आवश्यकता होती है। Interface state को authoritative rules से अलग करने पर modernization सुरक्षित होती है; iterative planning, mentoring और review से domain behavior खोए बिना systems सुधारे जा सकते हैं।" },
      ],
    },
  },
} satisfies WorkTranslations;

export const workRecords: WorkRecord[] = sourceCaseStudies.map((source) => {
  const { title, systemType, domain, summary, themes, sections, ...shared } = source;
  const content: Record<"en" | TranslatedLocale, WorkContent> = {
    en: { title, systemType, domain, summary, themes, sections },
    es: workTranslations[source.slug].es,
    hi: workTranslations[source.slug].hi,
  };
  return { ...shared, id: source.slug, slug: source.slug, content };
});

export const caseStudies = workRecords;

export function getPublishedWork(): WorkRecord[] {
  return workRecords.filter((work) => work.narrativeStatus === "published");
}

export function getWorkRecord(slug: string): WorkRecord | undefined {
  return workRecords.find((work) => work.slug === slug);
}

export const getCaseStudy = getWorkRecord;
