import React from 'react';
import { motion } from "framer-motion";
import { useNavigationType } from 'react-router-dom';

import "./styles.scss";

const transition = { ease: 'easeInOut', duration: 0.3 }

export const View = ({ children, className, style, overlay, layoutId, cupertinoTrans, headerPadding, backdropImage}) => {
    const navigateType = useNavigationType();

    const variants = {
      enter() {
        const isPush = navigateType === 'PUSH' 
  
        return {
          x: 0,
          transition,
          transitionEnd: {
            position: 'static'
          },
          ...(isPush
            ? {
                position: 'fixed',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0
              }
            : {})
        }
      },
      initial() {
        const isPush = navigateType === 'PUSH'
  
        return {
          x: isPush ? '100%' : '-25%',
          boxShadow: isPush ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : null,
          transition,
          ...(isPush
            ? {
                position: 'fixed',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0
              }
            : {})
        }
      },
  
      exit({ action }) {
        const isPop = navigateType === 'POP'
  
        return {
          x: isPop ? '100%' : '-10%',
          zIndex: isPop ? 1 : -1,
          boxShadow: isPop ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : null,
          transition,
          ...(isPop
            ? {
                position: 'fixed',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0
              }
            : {})
        }
      }
    }

    return (
        <motion.div 
            initial="initial"
            animate={cupertinoTrans && "enter"}
            exit={cupertinoTrans && "exit"}
            variants={cupertinoTrans && variants}
            className={`view ${headerPadding && "header-padding"} ${className}`} 
            layoutId={layoutId} 
            style={{
                ...style,
                ...(
                    overlay && {
                        width: '100vw',
                        height: '100vh',
                        position: 'fixed',
                        zIndex: 99999,
                        top: 0,
                        left: 0
                    }
                ),
                ...(
                  backdropImage && {
                    backgroundColor: 'transparent'
                  }
                )
        }}>
            { backdropImage && <div className="view__backdrop-image" style={{ backgroundImage: `url(${ backdropImage })` }}></div> }
            { children }
        </motion.div>
    )
}