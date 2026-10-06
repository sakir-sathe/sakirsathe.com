import type { CaseStudy } from "@/types";

/**
 * Public, anonymized engineering narratives.
 * Flows illustrate generic responsibilities, not internal system designs.
 * No organizations, private products, dates, metrics or private links.
 */
export const caseStudies: CaseStudy[] = [
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
    slug: "complex-product-configuration-platform",
    index: "W-06",
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
  {
    slug: "cross-platform-product-ai-platform",
    index: "W-07",
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
    index: "W-08",
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
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
