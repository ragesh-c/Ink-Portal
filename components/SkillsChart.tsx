import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { AboutContent } from '../types';

interface SkillsChartProps {
  data: AboutContent['skills'];
}

const SkillsChart: React.FC<SkillsChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#0a0a0a" strokeWidth={2} strokeDasharray="4 4" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#0a0a0a', fontSize: 12, fontWeight: 'bold', fontFamily: 'Inter' }} 
          />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#ff4d4d"
            strokeWidth={3}
            fill="#ff4d4d"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillsChart;