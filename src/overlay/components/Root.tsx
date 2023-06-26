import React, { ReactNode } from 'react';

const Root: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => <div className="p-3 m-0 h-80 w-64">{children}</div>;

export default Root;
