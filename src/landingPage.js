
const Logo = () => (
  <a href="/">
    <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 8C0 3.58172 3.58172 0 8 0H32C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 0 36.4183 0 32V8Z" fill="#4F46E5"/>
        <path d="M20 8L32 20L20 32L8 20L20 8Z" fill="#60A5FA"/>
      </svg>
      <span className="text-2xl font-bold text-gray-900">Kanun AI</span>
    </div>
  </a>
);

const Button = ({ variant = 'primary', children, onClick, href }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-center inline-block";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",
    secondary: "bg-white text-gray-800 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
  };
  
  const classes = `${baseStyles} ${variants[variant]}`;
  
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

const FeatureCard = ({ title, children }) => (
  <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </div>
);

const TechBadge = ({ children }) => (
  <div className="px-4 py-3 bg-white rounded-lg border border-gray-200 text-gray-700 font-medium text-sm hover:border-blue-300 hover:bg-blue-50 transition-all">
    {children}
  </div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <Logo />
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Features</a>
              <a href="#tech" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Technology</a>
              <a href="#quickstart" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Quick Start</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact</a>
              <a href="/chat">
                <Button variant="primary">Try Demo</Button>
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6">
        {/* Hero Section */}
        <section className="py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              RAG-Powered Legal Search
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Professional Legal Document Retrieval
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              A production-ready Retrieval-Augmented Generation (RAG) API for semantic search over legal documents. Fast vector search, explainable results, and built-in evaluation tools for Nepal's legal corpus.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="/chat">
                <Button variant="primary">Get Started</Button>
              </a>
              <Button variant="secondary" href="#features">Learn More</Button>
            </div>

            <div className="pt-6 flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>In Development</span>
              </div>
              <div>
                <span className="font-semibold">License:</span> MIT
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-10 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Why Kanun AI?</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg">Fast section-level retrieval from legal acts</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg">Hybrid strategy: dense embeddings + TF-IDF reranking</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg">OpenAPI-ready REST API for seamless integration</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enterprise-grade capabilities for legal document retrieval and analysis
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard title="Hybrid Retrieval">
              Combines dense embeddings using sentence-transformers with classical TF-IDF techniques to balance recall and precision for optimal search results.
            </FeatureCard>
            <FeatureCard title="Intelligent Reranking">
              Lightweight reranker improves top-k precision, ensuring the most relevant results appear first for better user experience.
            </FeatureCard>
            <FeatureCard title="Section-Level Search">
              Smart chunking and metadata enable precise section-level retrieval with full provenance tracking for accurate legal citations.
            </FeatureCard>
            <FeatureCard title="Evaluation Tools">
              Built-in endpoints compute MRR and MAP metrics against evaluation datasets to ensure retrieval quality.
            </FeatureCard>
            <FeatureCard title="Qdrant Vector Store">
              Persistent, high-performance nearest-neighbor search powered by Qdrant for fast and reliable vector operations.
            </FeatureCard>
            <FeatureCard title="FastAPI + OpenAPI">
              Well-documented REST API with interactive Swagger documentation for rapid integration and development.
            </FeatureCard>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech" className="py-20 bg-gradient-to-r from-gray-50 to-blue-50 -mx-6 px-6 rounded-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technology Stack</h2>
            <p className="text-xl text-gray-600">Built with modern, production-proven technologies</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <TechBadge>Python 3.8+</TechBadge>
            <TechBadge>FastAPI</TechBadge>
            <TechBadge>Uvicorn</TechBadge>
            <TechBadge>Sentence Transformers</TechBadge>
            <TechBadge>Qdrant</TechBadge>
            <TechBadge>Scikit-learn</TechBadge>
            <TechBadge>NumPy</TechBadge>
            <TechBadge>PyMuPDF</TechBadge>
            <TechBadge>PyPDF</TechBadge>
            <TechBadge>Docker</TechBadge>
            <TechBadge>python-dotenv</TechBadge>
            <TechBadge>Transformers</TechBadge>
          </div>
        </section>

        {/* Quick Start Section */}
        <section id="quickstart" className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Quick Start Guide</h2>
            <p className="text-xl text-gray-600">Get up and running in minutes</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Developer Setup</h3>
              <ol className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <span className="pt-1">Clone the repository and navigate to the folder</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <span className="pt-1">Create and activate a Python virtual environment</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <span className="pt-1">Install dependencies: <code className="bg-gray-100 px-2 py-1 rounded text-sm">pip install -r requirements.txt</code></span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                  <span className="pt-1">Start Qdrant using Docker for local development</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
                  <span className="pt-1">Run the API: <code className="bg-gray-100 px-2 py-1 rounded text-sm">cd app && uvicorn main:app --reload</code></span>
                </li>
              </ol>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">API Endpoints</h3>
              <div className="space-y-4 text-sm">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="font-bold text-gray-900"><span className="bg-green-100 text-green-700 px-2 py-1 rounded">GET</span> /api/v1/available-files</div>
                  <p className="text-gray-600 mt-1">List all indexed collections</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="font-bold text-gray-900"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">POST</span> /api/v1/query</div>
                  <p className="text-gray-600 mt-1">Semantic search (query, top_k)</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="font-bold text-gray-900"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">POST</span> /api/v1/test</div>
                  <p className="text-gray-600 mt-1">Reindex and store embeddings</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="font-bold text-gray-900"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">POST</span> /api/v1/evaluate</div>
                  <p className="text-gray-600 mt-1">Run retrieval metrics (MRR/MAP)</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <div className="font-bold text-gray-900"><span className="bg-red-100 text-red-700 px-2 py-1 rounded">DELETE</span> /api/v1/document/:name</div>
                  <p className="text-gray-600 mt-1">Remove a collection</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-xl text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-blue-200 text-sm font-semibold mb-1">Maintainer</div>
                  <div className="text-lg">Bibek Adhikari</div>
                </div>
                <div>
                  <div className="text-blue-200 text-sm font-semibold mb-1">Email</div>
                  <a href="mailto:beebek2004@gmail.com" className="text-lg hover:underline">beebek2004@gmail.com</a>
                </div>
                <div>
                  <div className="text-blue-200 text-sm font-semibold mb-1">Repository</div>
                  <a href="https://github.com/b33b3k/Legal-RAG" target="_blank" rel="noopener noreferrer" className="text-lg hover:underline flex items-center gap-2">
                    github.com/b33b3k/Legal-RAG
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Next Steps</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Wire the <code className="bg-gray-100 px-2 py-1 rounded text-sm">/api/v1/query</code> endpoint to the demo chat UI</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Add example requests and Postman collection for testing</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Explore deployment options for production use</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-20">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-4">
            <span className="text-white font-bold text-xl">Kanun AI</span>
          </div>
          <p className="mb-4">Professional Legal Document Retrieval System</p>
          <p className="text-sm">© 2025 Kanun AI. Licensed under MIT.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;