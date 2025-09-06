import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: '256-bit encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Login',
      description: 'Protected authentication'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified Platform',
      description: 'Trusted by thousands'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground font-medium">Your security is our priority</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/30">
            <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center mb-2">
              <Icon name={feature?.icon} size={20} className="text-success" />
            </div>
            <h4 className="text-sm font-medium text-foreground mb-1">{feature?.title}</h4>
            <p className="text-xs text-muted-foreground">{feature?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityBadges;