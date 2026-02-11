import React, { useState } from 'react';
import { Users, FileText, MessageSquare, Play, BarChart3, ChevronRight, Edit3, Plus, X, Check, Sparkles, Brain, Target, Zap } from 'lucide-react';

const SyntheticRespondentsTool = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPersonaDetail, setShowPersonaDetail] = useState(null);
  const [studyRunning, setStudyRunning] = useState(false);
  const [studyComplete, setStudyComplete] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState('interviews');

  // Form state
  const [targetProfile, setTargetProfile] = useState('30-40 year old mothers in Texas');
  const [additionalContext, setAdditionalContext] = useState('Income around $75K, consumes at-home coffee, busy weekday mornings, values convenience');
  const [respondentCount, setRespondentCount] = useState(5);
  const [personas, setPersonas] = useState([]);
  const [concept, setConcept] = useState(`Starbucks 22-count K-Cup in Pumpkin Spice flavor
Price point: $14.99
Seasonal limited edition, available Aug-Nov
"Bring the coffeehouse home with the iconic fall flavor"`);
  const [questions, setQuestions] = useState(`1. Walk me through your typical weekday morning routine.
2. Do you or your family consume coffee? Tell me about your habits.
3. How do you typically purchase coffee for home?
4. [Show concept] What are your first impressions of this product?
5. What would make you choose this over your current coffee?
6. How does the $14.99 price point feel for 22 K-cups?
7. Would you purchase this? Why or why not?
8. Who in your household would be most excited about this?`);

  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:8000';

  const steps = [
    { id: 1, name: 'Audience', icon: Target },
    { id: 2, name: 'Personas', icon: Users },
    { id: 3, name: 'Concept', icon: FileText },
    { id: 4, name: 'Interview', icon: MessageSquare },
    { id: 5, name: 'Results', icon: BarChart3 },
  ];

  const generatePersonas = async () => {
    setStudyRunning(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/personas/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target_profile: targetProfile,
          additional_context: additionalContext,
          respondent_count: respondentCount
        })
      });

      if (!response.ok) throw new Error('Failed to generate personas');

      const data = await response.json();
      setPersonas(data);
      setStudyRunning(false);
      setCurrentStep(2);
    } catch (err) {
      setError(err.message);
      setStudyRunning(false);
    }
  };

  const runStudy = async () => {
    setStudyRunning(true);
    setError(null);

    try {
      const questionList = questions.split('\n').filter(q => q.trim());

      const response = await fetch(`${API_URL}/api/study/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audience: {
            target_profile: targetProfile,
            additional_context: additionalContext,
            respondent_count: respondentCount
          },
          personas: personas,
          concept: {
            description: concept,
            price_point: '$14.99'
          },
          interview_script: {
            questions: questionList,
            interview_mode: 'individual',
            response_depth: 'moderate'
          }
        })
      });

      if (!response.ok) throw new Error('Failed to run study');

      const data = await response.json();
      setResults(data);
      setStudyRunning(false);
      setStudyComplete(true);
      setCurrentStep(5);
    } catch (err) {
      setError(err.message);
      setStudyRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Synthetic Respondents</h1>
            <p className="text-slate-400 text-sm">CPG Concept Testing Platform - Powered by Local Ollama</p>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4">
            <p className="text-red-200">Error: {error}</p>
          </div>
        )}

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 bg-slate-800/50 rounded-xl p-4">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <button
                onClick={() => setCurrentStep(step.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentStep === step.id
                    ? 'bg-violet-600 text-white'
                    : currentStep > step.id
                    ? 'bg-slate-700 text-green-400'
                    : 'bg-slate-700/50 text-slate-400'
                }`}
              >
                <step.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{step.name}</span>
                {currentStep > step.id && <Check className="w-4 h-4" />}
              </button>
              {idx < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-slate-600" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-slate-800/50 rounded-xl p-6 min-h-[500px]">
          {/* Step 1: Audience Definition */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Target className="w-5 h-5 text-violet-400" />
                Define Your Target Audience
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Target Profile</label>
                  <input
                    type="text"
                    value={targetProfile}
                    onChange={(e) => setTargetProfile(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Additional Context</label>
                  <textarea
                    value={additionalContext}
                    onChange={(e) => setAdditionalContext(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 h-24 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Number of Respondents</label>
                  <select
                    value={respondentCount}
                    onChange={(e) => setRespondentCount(parseInt(e.target.value))}
                    className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-500"
                  >
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                  </select>
                </div>
              </div>

              <button
                onClick={generatePersonas}
                disabled={studyRunning}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {studyRunning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating Personas...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Synthetic Participants
                  </>
                )}
              </button>
            </div>
          )}

          {/* Step 2: Personas */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-violet-400" />
                  Generated Personas ({personas.length})
                </h2>
              </div>

              <div className="grid grid-cols-5 gap-4">
                {personas.map((persona) => (
                  <div
                    key={persona.id}
                    onClick={() => setShowPersonaDetail(persona.id)}
                    className="bg-slate-700/50 rounded-xl p-4 cursor-pointer hover:bg-slate-700 transition-colors border border-transparent hover:border-violet-500/50"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center mb-3 text-lg font-semibold">
                      {persona.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="font-medium text-sm">{persona.name}</h3>
                    <p className="text-slate-400 text-xs">Age: {persona.age}</p>
                    <p className="text-slate-400 text-xs">{persona.location}</p>
                    <p className="text-slate-400 text-xs">{persona.profession}</p>
                    <p className="text-slate-400 text-xs">{persona.kids} kids</p>
                  </div>
                ))}
              </div>

              {/* Persona Detail Modal */}
              {showPersonaDetail && personas.find(p => p.id === showPersonaDetail) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowPersonaDetail(null)}>
                  <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    {(() => {
                      const persona = personas.find(p => p.id === showPersonaDetail);
                      return (
                        <>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">{persona.name}, {persona.age}</h3>
                            <button onClick={() => setShowPersonaDetail(null)} className="text-slate-400 hover:text-white">
                              <X className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-violet-400 text-sm font-medium mb-2">Demographics</h4>
                              {Object.entries(persona.demographics).map(([key, value]) => (
                                <p key={key} className="text-sm text-slate-300 mb-1">
                                  <span className="text-slate-500">{key}:</span> {value}
                                </p>
                              ))}
                            </div>
                            <div>
                              <h4 className="text-violet-400 text-sm font-medium mb-2">Psychographics</h4>
                              {Object.entries(persona.psychographics).map(([key, value]) => (
                                <p key={key} className="text-sm text-slate-300 mb-1">
                                  <span className="text-slate-500">{key}:</span> {value}
                                </p>
                              ))}
                            </div>
                            <div>
                              <h4 className="text-violet-400 text-sm font-medium mb-2">Behavioral Attributes</h4>
                              {Object.entries(persona.behavioral_attributes).map(([key, value]) => (
                                <p key={key} className="text-sm text-slate-300 mb-1">
                                  <span className="text-slate-500">{key}:</span> {value}
                                </p>
                              ))}
                            </div>
                            <div>
                              <h4 className="text-violet-400 text-sm font-medium mb-2">Biases & Quirks</h4>
                              {persona.biases.map((bias, idx) => (
                                <p key={idx} className="text-sm text-slate-300 mb-1">• {bias}</p>
                              ))}
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}

              <button
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Continue to Concept
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 3: Concept */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-violet-400" />
                Define Your Concept
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Product Concept</label>
                  <textarea
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 h-32 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Continue to Interview Script
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 4: Interview Script */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-violet-400" />
                Interview Script
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Interview Questions (one per line)</label>
                  <textarea
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 h-48 focus:outline-none focus:border-violet-500 font-mono text-sm"
                  />
                </div>
              </div>

              <button
                onClick={runStudy}
                disabled={studyRunning}
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {studyRunning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Running Interviews...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Run Concept Test
                  </>
                )}
              </button>
            </div>
          )}

          {/* Step 5: Results */}
          {currentStep === 5 && studyComplete && results && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-violet-400" />
                  Results Dashboard
                </h2>
              </div>

              {/* Tabs */}
              <div className="flex gap-4 border-b border-slate-700">
                {['interviews', 'summary'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveResultTab(tab)}
                    className={`pb-2 px-1 text-sm font-medium capitalize border-b-2 transition-colors ${
                      activeResultTab === tab
                        ? 'border-violet-500 text-violet-400'
                        : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab === 'interviews' ? 'Individual Interviews' : 'Executive Summary'}
                  </button>
                ))}
              </div>

              {activeResultTab === 'interviews' && (
                <div className="space-y-4">
                  {results.interviews.map((interview, idx) => (
                    <div key={idx} className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center text-xs font-semibold">
                          {interview.persona_name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-sm">{interview.persona_name}</span>
                      </div>
                      {interview.responses.map((resp, respIdx) => (
                        <div key={respIdx} className="mb-3">
                          <p className="text-violet-400 text-sm mb-1">Q: {resp.question}</p>
                          <p className="text-slate-300 text-sm italic">"{resp.response}"</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {activeResultTab === 'summary' && results.summary && (
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <p className="text-slate-400 text-xs mb-1">Purchase Intent</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                        {results.summary.purchase_intent}
                      </p>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <p className="text-slate-400 text-xs mb-1">Appeal Score</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                        {results.summary.appeal_score}
                      </p>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <p className="text-slate-400 text-xs mb-1">Value Perception</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                        {results.summary.value_perception}
                      </p>
                    </div>
                  </div>

                  {/* Key Findings */}
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="font-medium mb-3">Positive Findings</h3>
                    <div className="space-y-2">
                      {results.summary.positive_findings.map((finding, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-green-400">✓</span>
                          <span className="text-slate-300">{finding}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Concerns */}
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="font-medium mb-3">Concerns</h3>
                    <div className="space-y-2">
                      {results.summary.concerns.map((concern, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-amber-400">⚠</span>
                          <span className="text-slate-300">{concern}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="font-medium mb-3">Recommendations</h3>
                    <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside">
                      {results.summary.recommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Architecture Info */}
        <div className="mt-8 bg-slate-800/30 rounded-xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            Powered by Local Ollama
          </h3>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-violet-400 font-medium">Deep Personas</p>
              <p className="text-slate-400">AI-generated with biases and behaviors</p>
            </div>
            <div>
              <p className="text-violet-400 font-medium">Local Processing</p>
              <p className="text-slate-400">All data stays on your machine</p>
            </div>
            <div>
              <p className="text-violet-400 font-medium">Simple Prompts</p>
              <p className="text-slate-400">Easy to customize and tweak</p>
            </div>
            <div>
              <p className="text-violet-400 font-medium">Fast Results</p>
              <p className="text-slate-400">Get insights in minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyntheticRespondentsTool;
