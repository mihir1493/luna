import React, { useState } from 'react';
import { Users, FileText, MessageSquare, Play, BarChart3, ChevronRight, Edit3, Plus, X, Check, Sparkles, Brain, Target, Zap } from 'lucide-react';

const SyntheticRespondentsTool = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPersonaDetail, setShowPersonaDetail] = useState(null);
  const [studyRunning, setStudyRunning] = useState(false);
  const [studyComplete, setStudyComplete] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState('interviews');

  const steps = [
    { id: 1, name: 'Audience', icon: Target },
    { id: 2, name: 'Personas', icon: Users },
    { id: 3, name: 'Concept', icon: FileText },
    { id: 4, name: 'Interview', icon: MessageSquare },
    { id: 5, name: 'Results', icon: BarChart3 },
  ];

  const personas = [
    { id: 1, name: 'Sarah Martinez', age: 34, location: 'Austin, TX', profession: 'Teacher', kids: 2, intent: 8 },
    { id: 2, name: 'Maria Garcia', age: 38, location: 'Houston, TX', profession: 'Nurse', kids: 3, intent: 7 },
    { id: 3, name: 'Jennifer Williams', age: 32, location: 'Dallas, TX', profession: 'Accountant', kids: 1, intent: 9 },
    { id: 4, name: 'Ashley Thompson', age: 36, location: 'San Antonio, TX', profession: 'Sales Rep', kids: 2, intent: 6 },
    { id: 5, name: 'Emily Davis', age: 35, location: 'Fort Worth, TX', profession: 'Marketing Manager', kids: 2, intent: 7 },
  ];

  const personaDetail = {
    name: 'Sarah Martinez',
    age: 34,
    location: 'Austin, TX',
    demographics: {
      income: '$72,000',
      education: "Bachelor's",
      profession: 'Elementary Teacher',
      family: 'Married, 2 kids (5, 8)',
    },
    psychographics: {
      parenting: 'Authoritative',
      values: 'Convenience, Quality',
      decisionStyle: 'Research-then-buy',
      brandLoyalty: 'Medium',
    },
    coffeeHabits: {
      consumption: '2-3 cups/day',
      brewing: 'Keurig + drip',
      preferred: 'Medium roast',
      seasonal: 'Yes',
    },
    biases: [
      'Skeptical of "too good" deals',
      'Influenced by mom friends',
      'Price-sensitive but splurges on coffee',
    ],
  };

  const interviewResponses = [
    {
      persona: 'Sarah Martinez',
      question: 'Walk me through your typical weekday morning.',
      response: "Honestly? It's chaos. I'm up at 5:45, getting the kids ready for school. My Keurig is my lifeline - I pop in a pod while packing lunches. I don't have time to think about coffee, I just need it to happen fast...",
    },
    {
      persona: 'Sarah Martinez',
      question: 'What are your first impressions of this product?',
      response: "Ooh, Starbucks pumpkin spice in a K-cup? That's actually tempting. I love their PSL but I can't justify $7 at the drive-through anymore. 22 pods for $15 though... let me think. That's like 68 cents a cup? That's actually not bad...",
    },
  ];

  const runStudy = () => {
    setStudyRunning(true);
    setTimeout(() => {
      setStudyRunning(false);
      setStudyComplete(true);
      setCurrentStep(5);
    }, 3000);
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
            <p className="text-slate-400 text-sm">CPG Concept Testing Platform</p>
          </div>
        </div>

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
                    defaultValue="30-40 year old mothers in Texas"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-500"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Additional Context</label>
                  <textarea
                    defaultValue="Income around $75K, consumes at-home coffee, busy weekday mornings, values convenience"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 h-24 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Number of Respondents</label>
                  <select className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-500">
                    <option>5</option>
                    <option>8</option>
                    <option selected>10</option>
                    <option>15</option>
                    <option>20</option>
                  </select>
                </div>

                <div className="pt-4">
                  <p className="text-sm text-slate-400 mb-3">Or select from preset personas:</p>
                  <div className="grid grid-cols-3 gap-3">
                    {['Budget-Conscious Family Shoppers', 'Premium Coffee Enthusiasts', 'Health-Conscious Millennials', 'Convenience-First Parents', 'Value-Seeking Empty Nesters', 'Eco-Conscious Gen Z'].map((preset) => (
                      <button key={preset} className="text-left px-3 py-2 bg-slate-700/50 rounded-lg text-sm hover:bg-slate-700 transition-colors">
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <Sparkles className="w-4 h-4" />
                Generate Synthetic Participants
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
                <button className="flex items-center gap-2 text-violet-400 hover:text-violet-300">
                  <Plus className="w-4 h-4" />
                  Add Persona
                </button>
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
                    <button className="mt-2 text-violet-400 text-xs flex items-center gap-1 hover:text-violet-300">
                      <Edit3 className="w-3 h-3" /> Edit
                    </button>
                  </div>
                ))}
              </div>

              {/* Persona Detail Modal */}
              {showPersonaDetail && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowPersonaDetail(null)}>
                  <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{personaDetail.name}, {personaDetail.age}</h3>
                      <button onClick={() => setShowPersonaDetail(null)} className="text-slate-400 hover:text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-violet-400 text-sm font-medium mb-2">Demographics</h4>
                        {Object.entries(personaDetail.demographics).map(([key, value]) => (
                          <p key={key} className="text-sm text-slate-300 mb-1">
                            <span className="text-slate-500">{key}:</span> {value}
                          </p>
                        ))}
                      </div>
                      <div>
                        <h4 className="text-violet-400 text-sm font-medium mb-2">Psychographics</h4>
                        {Object.entries(personaDetail.psychographics).map(([key, value]) => (
                          <p key={key} className="text-sm text-slate-300 mb-1">
                            <span className="text-slate-500">{key}:</span> {value}
                          </p>
                        ))}
                      </div>
                      <div>
                        <h4 className="text-violet-400 text-sm font-medium mb-2">Coffee Habits</h4>
                        {Object.entries(personaDetail.coffeeHabits).map(([key, value]) => (
                          <p key={key} className="text-sm text-slate-300 mb-1">
                            <span className="text-slate-500">{key}:</span> {value}
                          </p>
                        ))}
                      </div>
                      <div>
                        <h4 className="text-violet-400 text-sm font-medium mb-2">Biases & Quirks</h4>
                        {personaDetail.biases.map((bias, idx) => (
                          <p key={idx} className="text-sm text-slate-300 mb-1">• {bias}</p>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Plus className="w-4 h-4" />
                        <input type="text" placeholder="Add custom attribute..." className="bg-transparent flex-1 focus:outline-none" />
                      </div>
                    </div>
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
                    defaultValue={`Starbucks 22-count K-Cup in Pumpkin Spice flavor
Price point: $14.99
Seasonal limited edition, available Aug-Nov
"Bring the coffeehouse home with the iconic fall flavor"`}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 h-32 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Product Images (optional)</label>
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-slate-700 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-600">
                      <Plus className="w-6 h-6 text-slate-500" />
                    </div>
                    <div className="w-24 h-24 bg-slate-700 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-600">
                      <Plus className="w-6 h-6 text-slate-500" />
                    </div>
                  </div>
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
                  <label className="text-sm text-slate-400 mb-2 block">Interview Questions</label>
                  <textarea
                    defaultValue={`1. Walk me through your typical weekday morning routine.
2. Do you or your family consume coffee? Tell me about your habits.
3. How do you typically purchase coffee for home?
4. [Show concept] What are your first impressions of this product?
5. What would make you choose this over your current coffee?
6. How does the $14.99 price point feel for 22 K-cups?
7. Would you purchase this? Why or why not?
8. Who in your household would be most excited about this?`}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 h-48 focus:outline-none focus:border-violet-500 font-mono text-sm"
                  />
                </div>

                <div className="flex gap-8">
                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Interview Style</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="style" defaultChecked className="accent-violet-500" />
                        <span className="text-sm">Individual Interviews</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="style" className="accent-violet-500" />
                        <span className="text-sm">Focus Group</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Response Depth</label>
                    <div className="flex gap-4">
                      {['Brief', 'Moderate', 'Detailed'].map((depth) => (
                        <label key={depth} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="depth" defaultChecked={depth === 'Moderate'} className="accent-violet-500" />
                          <span className="text-sm">{depth}</span>
                        </label>
                      ))}
                    </div>
                  </div>
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
          {currentStep === 5 && studyComplete && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-violet-400" />
                  Results Dashboard
                </h2>
                <button className="text-violet-400 hover:text-violet-300 text-sm">
                  Export Report
                </button>
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
                  {interviewResponses.map((item, idx) => (
                    <div key={idx} className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center text-xs font-semibold">
                          SM
                        </div>
                        <span className="font-medium text-sm">{item.persona}</span>
                      </div>
                      <p className="text-violet-400 text-sm mb-2">Q: {item.question}</p>
                      <p className="text-slate-300 text-sm italic">"{item.response}"</p>
                    </div>
                  ))}
                </div>
              )}

              {activeResultTab === 'summary' && (
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { label: 'Purchase Intent', value: '78%', color: 'from-green-500 to-emerald-500' },
                      { label: 'Appeal Score', value: '7.2/10', color: 'from-violet-500 to-indigo-500' },
                      { label: 'Value Perception', value: '6.8/10', color: 'from-blue-500 to-cyan-500' },
                      { label: 'Fit with Routine', value: '8.1/10', color: 'from-amber-500 to-orange-500' },
                    ].map((metric) => (
                      <div key={metric.label} className="bg-slate-700/50 rounded-lg p-4">
                        <p className="text-slate-400 text-xs mb-1">{metric.label}</p>
                        <p className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Key Findings */}
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="font-medium mb-3">Key Findings</h3>
                    <div className="space-y-2">
                      {[
                        { type: 'positive', text: 'Strong brand equity drives initial interest' },
                        { type: 'positive', text: 'Price-per-pod value proposition resonates' },
                        { type: 'positive', text: 'Seasonal timing aligns with "treat yourself" moments' },
                        { type: 'warning', text: 'Some concern about artificial flavoring' },
                        { type: 'warning', text: 'K-cup count (22) seen as slightly low for family consumption' },
                      ].map((finding, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <span className={finding.type === 'positive' ? 'text-green-400' : 'text-amber-400'}>
                            {finding.type === 'positive' ? '✓' : '⚠'}
                          </span>
                          <span className="text-slate-300">{finding.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="font-medium mb-3">Recommendations</h3>
                    <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside">
                      <li>Consider 30-count option for heavy-usage households</li>
                      <li>Emphasize "real pumpkin" or natural ingredients</li>
                      <li>Bundle promotion with standard roast for variety seekers</li>
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
            What Makes This Realistic
          </h3>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-violet-400 font-medium">Deep Personas</p>
              <p className="text-slate-400">50+ attributes including biases, quirks, and backstories</p>
            </div>
            <div>
              <p className="text-violet-400 font-medium">Multi-Agent Architecture</p>
              <p className="text-slate-400">Each persona is a dedicated AI agent with memory</p>
            </div>
            <div>
              <p className="text-violet-400 font-medium">Bias Injection</p>
              <p className="text-slate-400">Cognitive biases shape responses naturally</p>
            </div>
            <div>
              <p className="text-violet-400 font-medium">Speech Patterns</p>
              <p className="text-slate-400">Regional, educational, and demographic speech matching</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyntheticRespondentsTool;
