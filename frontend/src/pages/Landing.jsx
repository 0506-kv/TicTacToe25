import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Landing = () => {
    const [isVisible, setIsVisible] = useState({});
    const observerRefs = {
        hero: useRef(null),
        expenseCard: useRef(null),
        featuresTitle: useRef(null),
        features: useRef([]),
        stats: useRef(null),
        testimonials: useRef(null),
        cta: useRef(null),
    };

    // Setup intersection observers for animations
    useEffect(() => {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(prev => ({
                        ...prev,
                        [entry.target.dataset.section]: true
                    }));
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        // Observe all section elements
        Object.entries(observerRefs).forEach(([key, ref]) => {
            if (Array.isArray(ref.current)) {
                ref.current.forEach(el => el && observer.observe(el));
            } else if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => observer.disconnect();
    }, []);

    // Add refs to features array
    const addToFeaturesRef = (el) => {
        if (el && !observerRefs.features.current.includes(el)) {
            observerRefs.features.current.push(el);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* Navbar */}
            <Navbar />

            <div className="flex-grow pt-16">
                {/* Hero Section */}
                <div 
                    className="py-24 md:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900" 
                    ref={observerRefs.hero}
                    data-section="hero"
                >
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row items-center">
                            <div 
                                className={`md:w-1/2 mb-16 md:mb-0 transform transition-all duration-1000 ${
                                    isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                                }`}
                            >
                                <span className="inline-block px-4 py-1 rounded-full bg-blue-700/30 border border-blue-500/50 text-emerald-300 text-sm font-medium mb-5">
                                    Smart Financial Management
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
                                    Make Your Money <span className="text-emerald-400">Work Smarter</span>
                                </h1>
                                <p className="text-lg md:text-xl text-blue-100 mb-10 md:pr-10 leading-relaxed">
                                    Track, analyze, and optimize your spending with our powerful expense tracking tools. Gain insights that help you save more and spend wisely.
                                </p>
                                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                                    <Link
                                        to="/register"
                                        className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center transition-all duration-300"
                                    >
                                        <span className="group-hover:translate-x-[-8px] transition-transform duration-300">Start for Free</span>
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5 ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" 
                                            viewBox="0 0 20 20" 
                                            fill="currentColor"
                                        >
                                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        <div className="absolute inset-0 w-3 bg-white opacity-30 transform -skew-x-20 translate-x-[-100%] group-hover:translate-x-[800%] transition-transform duration-1000"></div>
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="group bg-transparent hover:bg-white/10 border border-white/30 hover:border-white text-white px-8 py-4 rounded-lg font-medium text-lg flex items-center justify-center transition-all duration-300"
                                    >
                                        <span>Sign In</span>
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5 ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" 
                                            viewBox="0 0 20 20" 
                                            fill="currentColor"
                                        >
                                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zM2 4a2 2 0 012-2h6.586a1 1 0 01.707.293l5 5a1 1 0 01.293.707V16a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            <div 
                                className={`md:w-1/2 md:pl-10 transform transition-all duration-1000 delay-300 ${
                                    isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                                }`}
                                ref={observerRefs.expenseCard}
                                data-section="expenseCard"
                            >
                                <div className="relative">
                                    {/* Decorative elements */}
                                    <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl"></div>
                                    <div className="absolute bottom-[-40px] left-[-40px] w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
                                    
                                    <div className="backdrop-blur-sm bg-white/90 p-6 rounded-2xl shadow-2xl border border-white/50 transform hover:scale-[1.02] transition-all duration-300">
                                        <div className="flex justify-between items-center mb-8">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">Expense Summary</h3>
                                                <p className="text-sm text-gray-500">Monthly overview</p>
                                            </div>
                                            <span className="px-4 py-1 bg-emerald-100 text-emerald-700 font-bold rounded-full">April 2025</span>
                                        </div>
                                        
                                        <div className="space-y-6">
                                            {[
                                                {name: 'Food', percentage: 75, amount: 450, color: 'emerald'},
                                                {name: 'Transportation', percentage: 50, amount: 280, color: 'blue'},
                                                {name: 'Housing', percentage: 83, amount: 950, color: 'purple'},
                                                {name: 'Entertainment', percentage: 25, amount: 120, color: 'pink'}
                                            ].map((category, i) => (
                                                <div key={category.name} className="relative">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-gray-700 font-medium">{category.name}</span>
                                                        <span className="font-bold text-gray-900">${category.amount}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                                        <div 
                                                            className={`h-3 rounded-full bg-${category.color}-600`}
                                                            style={{ 
                                                                width: `${category.percentage}%`,
                                                                animation: isVisible.expenseCard ? `growWidth-${i} 1.5s ease forwards` : 'none'
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <style jsx>{`
                                                        @keyframes growWidth-${i} {
                                                            0% { width: 0%; }
                                                            100% { width: ${category.percentage}%; }
                                                        }
                                                    `}</style>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <div className="mt-8 pt-6 border-t border-gray-200">
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-gray-700">Total</span>
                                                <div className="relative">
                                                    <span 
                                                        className="font-bold text-2xl text-blue-900"
                                                        style={{ 
                                                            opacity: isVisible.expenseCard ? 1 : 0,
                                                            animation: isVisible.expenseCard ? 'countUp 2s ease forwards' : 'none'
                                                        }}
                                                    >
                                                        $1,800
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Stats Section */}
                <div 
                    className="py-16 bg-white relative overflow-hidden"
                    ref={observerRefs.stats}
                    data-section="stats"
                >
                    <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-slate-50 to-transparent"></div>
                    <div className="container mx-auto px-6">
                        <div 
                            className={`grid grid-cols-1 md:grid-cols-3 gap-8 transform transition-all duration-700 ${
                                isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}
                        >
                            {[
                                { number: '50,000+', label: 'Active Users', color: 'blue' },
                                { number: '$12M+', label: 'Monthly Tracked', color: 'emerald' },
                                { number: '98%', label: 'Satisfaction Rate', color: 'purple' }
                            ].map((stat, index) => (
                                <div 
                                    key={index}
                                    className={`text-center p-8 rounded-xl transform transition-all duration-700 delay-${index * 200} ${
                                        isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                    }`}
                                >
                                    <div className={`text-4xl font-bold mb-2 text-${stat.color}-600`}>{stat.number}</div>
                                    <div className="text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-20 bg-slate-50">
                    <div className="container mx-auto px-6">
                        <div 
                            className="text-center mb-16"
                            ref={observerRefs.featuresTitle}
                            data-section="featuresTitle"
                        >
                            <span 
                                className={`inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4 transform transition-all duration-700 ${
                                    isVisible.featuresTitle ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                            >
                                Powerful Features
                            </span>
                            <h2 
                                className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 transform transition-all duration-700 delay-150 ${
                                    isVisible.featuresTitle ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                            >
                                Everything You Need to Manage Your Finances
                            </h2>
                            <p 
                                className={`text-lg text-gray-600 max-w-2xl mx-auto transform transition-all duration-700 delay-300 ${
                                    isVisible.featuresTitle ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                            >
                                Our comprehensive tools help you track expenses, visualize spending patterns, and make informed financial decisions.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-10">
                            {[
                                {
                                    title: "Intelligent Categorization",
                                    description: "Automatically categorize your expenses with our smart AI system that learns from your spending habits.",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    ),
                                    color: "blue"
                                },
                                {
                                    title: "Interactive Analytics",
                                    description: "View detailed charts and reports that help you understand your spending habits and identify saving opportunities.",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    ),
                                    color: "emerald"
                                },
                                {
                                    title: "Financial Calendar",
                                    description: "Plan ahead with our calendar view that shows upcoming bills and helps you avoid missed payments.",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    ),
                                    color: "purple"
                                }
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    ref={addToFeaturesRef}
                                    data-section={`feature-${index}`}
                                    className={`group bg-white p-8 rounded-xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-500 transform ${
                                        isVisible[`feature-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                    }`}
                                    style={{ transitionDelay: `${index * 150}ms` }}
                                >
                                    <div className={`flex items-center justify-center h-16 w-16 rounded-full bg-${feature.color}-100 text-${feature.color}-600 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Testimonials */}
                <div 
                    className="py-20 bg-blue-900"
                    ref={observerRefs.testimonials}
                    data-section="testimonials"
                >
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 
                                className={`text-3xl md:text-4xl font-bold text-white mb-4 transform transition-all duration-700 ${
                                    isVisible.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                            >
                                Loved by Users Like You
                            </h2>
                            <p 
                                className={`text-lg text-blue-200 max-w-2xl mx-auto transform transition-all duration-700 delay-150 ${
                                    isVisible.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                            >
                                See what others are saying about how our app has helped them manage their finances better.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    quote: "This app completely transformed how I manage my finances. I've saved over $2,000 in the first three months!",
                                    author: "Sarah Johnson",
                                    role: "Small Business Owner"
                                },
                                {
                                    quote: "The visualization tools helped me understand where my money was going. Now I can make informed decisions about my spending.",
                                    author: "Michael Chen",
                                    role: "Software Engineer"
                                },
                                {
                                    quote: "As a student, budgeting was always challenging. This app makes it so simple that I've finally got my finances under control.",
                                    author: "Emily Rodriguez",
                                    role: "Graduate Student"
                                }
                            ].map((testimonial, index) => (
                                <div 
                                    key={index}
                                    className={`bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 transform transition-all duration-700 ${
                                        isVisible.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                    }`}
                                    style={{ transitionDelay: `${index * 200}ms` }}
                                >
                                    <svg className="h-8 w-8 text-emerald-400 mb-4" fill="currentColor" viewBox="0 0 32 32">
                                        <path d="M10 8v12h12v-12h-12zM8 6h16v16h-16v-16z"></path>
                                        <path d="M16 16c1.105 0 2-0.895 2-2s-0.895-2-2-2c-1.105 0-2 0.895-2 2s0.895 2 2 2z"></path>
                                    </svg>
                                    <p className="text-white mb-4 leading-relaxed">{testimonial.quote}</p>
                                    <div>
                                        <p className="font-semibold text-white">{testimonial.author}</p>
                                        <p className="text-blue-200 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* CTA Section */}
                <div 
                    className="py-20 bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 text-white"
                    ref={observerRefs.cta}
                    data-section="cta"
                >
                    <div className="container mx-auto px-6 relative">
                        {/* Decorative elements */}
                        <div className="absolute top-[-100px] right-[10%] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-[-100px] left-[10%] w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
                        
                        <div 
                            className={`text-center max-w-3xl mx-auto relative transition-all duration-1000 ${
                                isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                                Start Your Financial Journey Today
                            </h2>
                            <p className="text-xl text-blue-200 mb-10 leading-relaxed">
                                Join thousands of users who are making smarter financial decisions and building a better future with our powerful tracking tools.
                            </p>
                            <Link
                                to="/register"
                                className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-emerald-600/30 transition-all duration-300 group"
                            >
                                <span className="mr-2">Create Your Free Account</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <footer className="bg-slate-900 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-8 md:mb-0">
                            <div className="flex items-center mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="text-xl font-bold">Finance<span className="text-emerald-400">Tracker</span></h3>
                            </div>
                            <p className="text-slate-400 max-w-md">Helping you manage your finances efficiently with powerful tracking and analysis tools.</p>
                            <p className="text-slate-500 mt-4">© 2025 FinanceTracker. All Rights Reserved.</p>
                        </div>
                        <div className="flex space-x-8">
                            <div>
                                <h4 className="font-semibold mb-3 text-emerald-400">Company</h4>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-slate-300 hover:text-white transition-colors">About</a></li>
                                    <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Careers</a></li>
                                    <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Blog</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-3 text-emerald-400">Legal</h4>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Terms</a></li>
                                    <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Privacy</a></li>
                                    <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Support</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;