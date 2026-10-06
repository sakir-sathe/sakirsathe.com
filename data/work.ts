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
    domain: "Enterprise Product Engineering",
    summary: "Enterprise engineering software for configuring complex physical products, validating rules and generating downstream order, pricing and reporting outputs.",
    technologies: ["ASP.NET Core", "ASP.NET MVC", "React", "Redux / Saga", "Angular", "SQL Server", "REST APIs"],
    themes: ["Rules engines", "Complex workflows", "Full-stack architecture", "Technical leadership", "Maintainability", "Product engineering"],
    narrativeStatus: "published",
    sections: [
      {
        heading: "System overview",
        body: "The platform supported configuration of complex physical products, with validation and downstream order, pricing and reporting outputs. Its user workflows needed to make interdependent choices understandable without exposing the details of proprietary configuration rules.",
      },
      {
        heading: "My contribution",
        body: "I worked across technical leadership, full-stack development, validation logic, UI workflows, APIs, reporting, code review, estimation and engineering quality.",
      },
      {
        heading: "Engineering challenge",
        body: "Many interdependent options can determine whether a configuration is valid. A change in one part of the configuration may affect choices elsewhere. The software must make that complexity understandable to users while keeping validation logic reliable, maintainable and separate from presentation details.",
      },
      {
        heading: "Architecture and approach",
        body: "The generic flow begins with a web UI and application or API layer. Configuration logic and validation rules determine the valid state before persistence and downstream outputs. Reporting and integration boundaries consume the configuration without needing to reproduce the user interface. No proprietary rules or product details are included in this flow.",
        flow: ["Web UI", "Application / API layer", "Configuration logic", "Validation rules", "Persistence", "Reporting / downstream outputs"],
      },
      {
        heading: "Engineering priorities",
        body: "Frontend state and authoritative validation serve different purposes. The interface needs to explain choices and constraints, while application logic needs to remain dependable regardless of the path a user takes. Clear boundaries support review, estimation and changes to complex workflows without spreading configuration rules across every layer.",
      },
      {
        heading: "Lessons and takeaways",
        body: "A configuration system is as much a communication problem as a rules problem. Users need understandable feedback, and engineers need rules that can be reasoned about independently of the UI. Maintainability depends on preserving that separation as the application and its workflows evolve.",
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
