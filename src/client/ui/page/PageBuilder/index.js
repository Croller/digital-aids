import React, { useEffect } from 'react';
import { PageBuilderModule } from 'client/ui/modules/PageBuilder';

const PageBuilder = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <PageBuilderModule />
  );
};

export default PageBuilder;
