import { Building, CreditCard, Shield } from 'lucide-react';

export const NODE_TYPES = {
  Account: {
    color: 'bg-blue-500',
    textColor: 'text-white',
    icon: Building,
    allowedChildren: ['Loan', 'Collateral'],
    canBeRoot: true,
    description: 'Customer account container'
  },
  Loan: {
    color: 'bg-green-500',
    textColor: 'text-white',
    icon: CreditCard,
    allowedChildren: ['Collateral'],
    canBeRoot: true,
    description: 'Loan issued to account'
  },
  Collateral: {
    color: 'bg-purple-500',
    textColor: 'text-white',
    icon: Shield,
    allowedChildren: [],
    canBeRoot: false,
    description: 'Asset pledged against loan'
  }
};

export const getRootNodeTypes = () => {
  return Object.entries(NODE_TYPES)
    .filter(([_, config]) => config.canBeRoot)
    .map(([type]) => type);
};