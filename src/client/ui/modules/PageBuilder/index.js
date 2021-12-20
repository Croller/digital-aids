import React, { useState, useEffect } from 'react';
import {
  setLocalStorage,
  getLocalStorage,
} from 'client/utils/common';
import { EditPanel } from './components/EditPanel';
import { components } from './constants';
import {
  PageBuilderWrapper,
  ContainerWrapper,
  FooterWrapper,
} from './styled';

export const PageBuilderModule = ({
  data = null,
}) => {
  const keyStorage = 'testPageBuilder';
  const [source, setSource] = useState(data || [
    {
      name: 'header',
      value: {
        text: null,
      },
    },
  ]);
  
  const getComponent = (src = null, s) => {
    if (!src || (src && !src.name)) return <></>;
    const item = components.find(f => f.name === src.name);
    const props = { ...src, onUpdate: (obj) => handleOnUpdate(obj, s) };
    return item ? item.component(props) : <></>;
  }; 

  const updateSource = (arr) => {
    setSource(arr);
    setLocalStorage(keyStorage, arr);
  };

  const handleOnMove = (dir, from) => {
    if (dir === 'up' && from === 0) return;
    if (dir === 'down' && from === source.length - 1) return;
    const to = dir === 'up' ? from - 1 : from + 1;
    updateSource(source.reduce((arr, item, i, curr) => {
      if (i === to && dir === 'up') {
        return [...arr, curr[from], curr[to]];
      }
      if (i === from && dir === 'down') {
        return [...arr, curr[to], curr[from]];
      }
      if (i === to || i === from) return arr;
      return [...arr, item];
    }, []));
  };

  const handleOnCopy = (index, obj = null) => {
    updateSource([
      ...source.slice(0, index),
      obj || source[index],
      ...source.slice(index),
    ]);
  };

  const handeleOnDelete = (index) => {
    updateSource(source.filter((f, i) => i !== index));
  };

  const handleOnSelect = (name = null, index) => {
    if (!name) return null;
    const comp = components.find(f => f.name === name);
    if (comp) {
      const { value } = comp;
      handleOnCopy({ name, value }, index);
    }
  };

  const handleOnUpdate = (obj, index) => {
    console.log('onUpdate', obj);
    
    updateSource(source.map((src, s) => {
      if (s === index) {
        return { ...src, value: obj };
      }
      return src;
    }));
  };

  useEffect(() => {
    const localStorage = getLocalStorage(keyStorage);
    if (localStorage) {
      setSource(localStorage);
    }
  }, []);

  return (
    <PageBuilderWrapper>
      <ContainerWrapper>
        {source.map((src, s) => (
          <EditPanel
            index={s}
            key={`_comp_${s + 1}`}
            components={components}
            onMove={handleOnMove}
            onCopy={handleOnCopy}
            onDelete={handeleOnDelete}
            onSelect={handleOnSelect}
          >
            {getComponent(src, s)}
          </EditPanel>
        ))}
      </ContainerWrapper>
      <FooterWrapper />
    </PageBuilderWrapper>
  );
};
