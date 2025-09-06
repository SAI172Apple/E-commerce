import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const TestCredentials = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const credentials = [
    {
      role: 'Customer Account',
      email: 'john.doe@example.com',
      password: 'password123',
      description: 'Regular customer with saved cart items'
    },
    {
      role: 'Admin Account',
      email: 'admin@ecommercehub.com',
      password: 'admin2024',
      description: 'Administrative access with full permissions'
    },
    {
      role: 'Premium Customer',
      email: 'sarah.wilson@example.com',
      password: 'secure456',
      description: 'Premium member with exclusive benefits'
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between text-blue-800 hover:bg-blue-100 transition-smooth"
      >
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} />
          <span className="text-sm font-medium">Test Credentials Available</span>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="transition-transform duration-200"
        />
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-blue-200">
          <p className="text-xs text-blue-700 mb-3 mt-3">
            Use these credentials to test the login functionality:
          </p>
          
          <div className="space-y-3">
            {credentials?.map((cred, index) => (
              <div key={index} className="bg-white rounded-md p-3 border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-blue-900">{cred?.role}</h4>
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    Test Account
                  </span>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">Email:</span>
                    <div className="flex items-center space-x-1">
                      <code className="bg-blue-50 px-2 py-1 rounded text-blue-800">
                        {cred?.email}
                      </code>
                      <button
                        onClick={() => copyToClipboard(cred?.email)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Copy email"
                      >
                        <Icon name="Copy" size={12} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">Password:</span>
                    <div className="flex items-center space-x-1">
                      <code className="bg-blue-50 px-2 py-1 rounded text-blue-800">
                        {cred?.password}
                      </code>
                      <button
                        onClick={() => copyToClipboard(cred?.password)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Copy password"
                      >
                        <Icon name="Copy" size={12} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-blue-600 mt-2 italic">{cred?.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCredentials;