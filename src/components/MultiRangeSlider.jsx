import PropTypes from "prop-types";
import { useState, useRef, useCallback, useEffect } from "react";
const MultiRangeSlider = ({min, max, onChange}) => {
    const [minVal, setMinVal] = useState(min);
    onst [maxVal, setMaxVal] = useState(max);
    
    const maxValRef = useRef(null);
    const minValRef = useRef(null);
    const range = useRef(null);
    

    <div ref={range} className="slider__range" />
    
    MultiRangeSlider.propTypes = {
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired
      };
    return (
        <>
          <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            ref={minValRef}

            onChange={(event) => {
                const value = Math.min(+event.target.value, maxVal - 1);
                setMinVal(value);
                event.target.value = value.toString();
            }}
            className={classnames("thumb thumb--zindex-3", {
                "thumb--zindex-5": minVal > max - 100})}
          />
        <div className="slider">
        <div className="slider__track" />
        <div className="slider__range" />
        </div>
          <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}

          onChange={(event) => {
              const value = Math.max(+event.target.value, minVal + 1);
              setMaxVal(value);
              event.target.value = value.toString();
          }}
          className="thumb thumb--zindex-4"
          />
        <div className="slider">
        <div className="slider__track" />
        <div className="slider__range" />
        </div>  
        </>
      );
    };
    
    export default MultiRangeSlider;