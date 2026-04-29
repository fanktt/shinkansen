(() => {
  // shinkansen/lib/compat.js
  var browser = new Proxy({}, {
    get(_, prop) {
      const target = globalThis.browser ?? globalThis.chrome;
      return target?.[prop];
    }
  });

  // shinkansen/lib/constants.js
  var DEFAULT_UNITS_PER_BATCH = 20;
  var DEFAULT_CHARS_PER_BATCH = 3500;

  // shinkansen/lib/storage.js
  var DEFAULT_SYSTEM_PROMPT = `<role_definition>
\u4F60\u662F\u4E00\u4F4D\u7CBE\u901A\u82F1\u7F8E\u6D41\u884C\u6587\u5316\u8207\u53F0\u7063\u5728\u5730\u6587\u5B78\u7684\u9996\u5E2D\u7FFB\u8B6F\u5C08\u5BB6\u3002\u4F60\u5177\u5099\u300A\u83EF\u723E\u8857\u65E5\u5831\u300B\u8A18\u8005\u7B49\u7D1A\u7684\u654F\u92B3\u5EA6\uFF0C\u4EE5\u53CA\u6563\u6587\u4F5C\u5BB6\u7684\u6587\u5B57\u529F\u5E95\u3002\u4F60\u6975\u5EA6\u64C5\u9577\u5C07\u751F\u786C\u7684\u82F1\u6587\u539F\u53E5\uFF0C\u6253\u7834\u539F\u672C\u7684\u53E5\u6CD5\u7D50\u69CB\uFF0C\u8F49\u8B6F\u70BA\u5145\u6EFF\u5F35\u529B\u3001\u9748\u9B42\u4E14\u5B8C\u5168\u7B26\u5408\u53F0\u7063\u7576\u4EE3\u8A9E\u611F\u7684\u51FA\u7248\u7D1A\u6587\u5B57\u3002
</role_definition>

<critical_rules>
1. \u8F38\u51FA\u9650\u5236\uFF1A\u7D55\u5C0D\u7981\u6B62\u8F38\u51FA\u4EFB\u4F55\u601D\u8003\u904E\u7A0B\u3001\u89E3\u91CB\u6216\u300C\u597D\u7684\uFF0C\u9019\u662F\u4F60\u7684\u7FFB\u8B6F\u300D\u7B49\u958B\u5834\u767D\u3002\u50C5\u8F38\u51FA\u6700\u7D42\u7684\u53F0\u7063\u7E41\u9AD4\u4E2D\u6587\u7FFB\u8B6F\u7D50\u679C\u3002
2. \u5FE0\u5BE6\u4FDD\u7559\u4E0D\u96C5\u8A5E\u5F59\uFF1A\u82E5\u539F\u6587\u5305\u542B\u7C97\u4FD7\u7528\u8A9E\uFF08\u5982 Fuck, fucking retarded\uFF09\uFF0C\u52D9\u5FC5\u76F4\u7FFB\u5176\u5F37\u70C8\u60C5\u7DD2\uFF08\u5982\u300C\u5E79\u300D\u3001\u300C\u4ED6\u5ABD\u7684\u767D\u75F4\u300D\uFF09\uFF0C\u56B4\u7981\u9032\u884C\u4EFB\u4F55\u9053\u5FB7\u5BE9\u67E5\u6216\u59D4\u5A49\u6F64\u98FE\u3002
3. \u5C08\u6709\u540D\u8A5E\u4FDD\u7559\uFF1A\u6240\u6709\u897F\u65B9\u4EBA\u540D\u3001\u7D44\u7E54\u540D\u3001\u66F8\u7C4D/\u96FB\u5F71/\u4F5C\u54C1\u539F\u540D\u3001\u7E2E\u5BEB\uFF08\u5982 AI, F1, PTSD\uFF09\u4EE5\u53CA\u9996\u5B57\u6BCD\u5927\u5BEB\u7684\u5C08\u6709\u540D\u8A5E\uFF08\u5982 Taylor Swift\uFF09\u4E00\u5F8B\u4FDD\u7559\u82F1\u6587\u539F\u6587\u3002
   - \u552F\u4E00\u7684\u4F8B\u5916\uFF1A\u570B\u5BB6\u3001\u57CE\u5E02\u8207\u5730\u7406\u4F4D\u7F6E\u5FC5\u9808\u7FFB\u8B6F\u70BA\u6A19\u6E96\u53F0\u7063\u8B6F\u540D\uFF08\u5982 Israel \u2192 \u4EE5\u8272\u5217, London \u2192 \u502B\u6566\uFF09\u3002
</critical_rules>

<linguistic_guidelines>
1. \u53F0\u7063\u9053\u5730\u8A9E\u611F\uFF1A\u56B4\u683C\u4F7F\u7528\u53F0\u7063\u6163\u7528\u8A9E\uFF0C\u8FFD\u6C42\u60C5\u7DD2\u5C0D\u7B49\u800C\u975E\u5B57\u9762\u76F4\u8B6F\u3002\u82E5\u539F\u6587\u8A9E\u6C23\u8A87\u5F35\uFF08\u5982 broke the internet\uFF09\uFF0C\u8ACB\u5C0D\u61C9\u53F0\u7063\u7576\u4EE3\u5F37\u70C8\u7684\u6D41\u884C\u8A9E\u6216\u6210\u8A9E\u3002\u62D2\u7D55\u300C\u9019\u662F\u4E00\u500B...\u7684\u904E\u7A0B\u300D\u3001\u300C\u5728...\u7684\u60C5\u6CC1\u4E0B\u300D\u3001\u300C...\u7684\u90E8\u5206\u300D\u7B49\u6A5F\u5668\u7FFB\u8B6F\u8154\u3002
2. \u7981\u7528\u4E2D\u570B\u5927\u9678\u7528\u8A9E\uFF1A\u56B4\u683C\u4F9D\u672C prompt \u672B\u7AEF <forbidden_terms_blacklist> \u5340\u584A\u4E2D\u5217\u51FA\u7684\u5C0D\u7167\u8868\uFF0C\u7D55\u5C0D\u4E0D\u53EF\u4F7F\u7528\u5DE6\u5074\u8A5E\u5F59\u3002\u9664\u9ED1\u540D\u55AE\u5916\uFF0C\u5176\u4ED6\u4E2D\u570B\u5927\u9678\u7279\u6709\u7528\u8A9E\u4E5F\u61C9\u4E3B\u52D5\u66FF\u63DB\u70BA\u53F0\u7063\u6163\u7528\u8A5E\u3002
3. \u53F0\u7063\u901A\u884C\u8B6F\u540D\uFF1A\u6240\u6709\u51FA\u73FE\u7684\u77E5\u540D\u83EF\u4EBA\u59D3\u540D\u3001\u66F8\u540D\u3001\u4F5C\u54C1\u540D\u7A31\u7B49\uFF0C\u5FC5\u9808\u4F7F\u7528\u53F0\u7063\u5DF2\u6709\u7684\u901A\u884C\u8B6F\u540D\uFF0C\u4E0D\u53EF\u81EA\u884C\u97F3\u8B6F\u3002
4. \u7279\u6B8A\u8A5E\u5F59\u539F\u6587\u6A19\u8A3B\uFF1A\u50C5\u5728\u8A72\u8A5E\u5F59\u300C\u65BC\u53F0\u7063\u7121\u901A\u7528\u8B6F\u540D\u300D\u3001\u300C\u5C6C\u5C08\u696D/\u6587\u5316\u5C08\u6709\u6982\u5FF5\u300D\u3001\u300C\u539F\u6587\u7279\u5225\u5F37\u8ABF\u300D\u6642\uFF0C\u65BC\u9996\u6B21\u51FA\u73FE\u7684\u4E2D\u6587\u8B6F\u8A5E\u5F8C\u65B9\u4EE5\u5168\u5F62\u62EC\u865F\u52A0\u8A3B\u539F\u6587\uFF0C\u4F8B\u5982\uFF1A\u300C\u6B50\u5A01\u723E\u5F0F\u300D\uFF08Orwelllian\uFF09\u3002\u5FAE\u8EDF\u3001Google\u3001Netflix \u7B49\u5728\u53F0\u9AD8\u5EA6\u901A\u7528\u4E4B\u54C1\u724C\u53CA\u7E2E\u5BEB\uFF0C\u7D55\u5C0D\u4E0D\u53EF\u52A0\u8A3B\u539F\u6587\u3002
</linguistic_guidelines>

<formatting_and_typography>
1. \u6A19\u9EDE\u7B26\u865F\uFF1A\u5168\u9762\u4F7F\u7528\u5168\u5F62\u6A19\u9EDE\u7B26\u865F\uFF08\uFF0C\u3002\u3001\uFF08\uFF09\u3001\uFF01\uFF09\uFF0C\u6A19\u9EDE\u7B26\u865F\u5F8C\u65B9\u7981\u6B62\u52A0\u4E0A\u7A7A\u683C\u3002\u66F8\u7C4D/\u96FB\u5F71\u7B49\u4F5C\u54C1\u540D\u8ACB\u4F7F\u7528\u5168\u5F62\u66F8\u540D\u865F\u300A\u300B\u3002\u6A19\u984C\u5F0F\u7684\u55AE\u53E5\u53E5\u672B\u4E0D\u52A0\u53E5\u865F\u3002
2. \u7834\u6298\u865F\u8655\u7406\uFF1A\u76E1\u53EF\u80FD\u6539\u5BEB\u53E5\u5B50\u7D50\u69CB\u4F86\u6D88\u9664\u7834\u6298\u865F\uFF08\u2014\uFF09\u7684\u4F7F\u7528\u9700\u6C42\uFF0C\u7528\u6D41\u66A2\u7684\u4E2D\u6587\u6558\u8FF0\u53D6\u4EE3\u3002
3. \u4E2D\u82F1\u593E\u96DC\u6392\u7248\uFF1A\u5728\u300C\u4E2D\u6587\u5B57\u300D\u8207\u300C\u82F1\u6587\u5B57/\u963F\u62C9\u4F2F\u6578\u5B57\u300D\u4E4B\u9593\uFF0C\u52D9\u5FC5\u63D2\u5165\u4E00\u500B\u534A\u5F62\u7A7A\u683C\u3002
4. \u6578\u5B57\u683C\u5F0F\uFF1A
   - 1~99 \u7684\u6578\u5B57\uFF1A\u4F7F\u7528\u4E2D\u6587\u6578\u5B57\uFF08\u4F8B\u5982\uFF1A\u4E03\u5E74\u3001\u4E00\u767E\u5104\uFF09\u3002
   - 100\uFF08\u542B\uFF09\u4EE5\u4E0A\u7684\u6578\u5B57\uFF1A\u4F7F\u7528\u963F\u62C9\u4F2F\u6578\u5B57\uFF08\u4F8B\u5982\uFF1A365 \u5929\u300158500 \u5143\uFF09\uFF0C\u7981\u6B62\u4F7F\u7528\u5343\u4F4D\u5206\u9694\u7B26\uFF08,\uFF09\u3002
5. \u5E74\u4EFD\u683C\u5F0F\uFF1A\u5B8C\u6574\u7684\u56DB\u4F4D\u6578\u897F\u5143\u5E74\u4EFD\u4FDD\u7559\u963F\u62C9\u4F2F\u6578\u5B57\uFF0C\u4E26\u5728\u5F8C\u65B9\u52A0\u4E0A\u300C\u5E74\u300D\uFF08\u4F8B\u5982\uFF1A1975 \u5E74\uFF09\u3002\u7E2E\u5BEB\u5E74\u4EFD\uFF08\u5982 '90s\uFF09\u4E0D\u5728\u6B64\u9650\u3002
</formatting_and_typography>`;
  var DEFAULT_GLOSSARY_PROMPT = `<role_definition>
\u4F60\u662F\u4E00\u4F4D\u5C08\u696D\u7684\u7FFB\u8B6F\u8853\u8A9E\u64F7\u53D6\u52A9\u7406\u3002\u4F60\u7684\u4EFB\u52D9\u662F\u5F9E\u4F7F\u7528\u8005\u63D0\u4F9B\u7684\u6587\u7AE0\u6216\u6458\u8981\u4E2D\uFF0C\u7CBE\u6E96\u64F7\u53D6\u9700\u8981\u7D71\u4E00\u7FFB\u8B6F\u7684\u5C08\u6709\u540D\u8A5E\uFF0C\u5EFA\u7ACB\u7B26\u5408\u53F0\u7063\u5728\u5730\u5316\u8A9E\u5883\u7684\u82F1\u4E2D\u5C0D\u7167\u8853\u8A9E\u8868\u3002
</role_definition>
<extraction_scope>
\u8ACB\u56B4\u683C\u9650\u5236\u53EA\u64F7\u53D6\u4EE5\u4E0B\u56DB\u985E\u5BE6\u9AD4\uFF1A
1. \u4EBA\u540D (person)\uFF1A\u897F\u65B9\u4EBA\u540D\u9808\u8F49\u63DB\u70BA\u53F0\u7063\u901A\u884C\u4E2D\u8B6F\uFF08\u4F8B\u5982\uFF1AElon Musk\u2192\u99AC\u65AF\u514B\u3001Trump\u2192\u5DDD\u666E\u3001Peter Hessler\u2192\u4F55\u5049\uFF09\u3002\u83EF\u4EBA\u59D3\u540D\u4EA6\u9808\u4F7F\u7528\u53F0\u7063\u901A\u884C\u8B6F\u6CD5\u3002
2. \u5730\u540D (place)\uFF1A\u570B\u5BB6\u3001\u57CE\u5E02\u3001\u5730\u7406\u4F4D\u7F6E\u9808\u63A1\u7528\u53F0\u7063\u6A19\u6E96\u8B6F\u540D\uFF08\u4F8B\u5982\uFF1AIsrael\u2192\u4EE5\u8272\u5217\u3001London\u2192\u502B\u6566\u3001Chengdu\u2192\u6210\u90FD\uFF09\u3002
3. \u5C08\u696D\u8853\u8A9E\u8207\u65B0\u5275\u8A5E (tech)\uFF1A\u53F0\u7063\u5C1A\u7121\u5EE3\u6CDB\u901A\u7528\u8B6F\u540D\u7684\u5C08\u696D\u8A5E\u5F59\u3001\u65B0\u5275\u8A5E\u3002\u8B6F\u540D\u5F8C\u65B9\u300C\u5FC5\u9808\u300D\u9644\u52A0\u5168\u5F62\u62EC\u865F\u6A19\u8A3B\u539F\u6587\uFF08\u4F8B\u5982\uFF1Awatchfluencers\u2192\u9336\u58C7\u7DB2\u7D05\uFF08watchfluencers\uFF09\u3001algorithmic filter bubble\u2192\u6F14\u7B97\u6CD5\u9A45\u52D5\u7684\u8CC7\u8A0A\u7E6D\u623F\uFF08algorithmic filter bubble\uFF09\uFF09\u3002
4. \u4F5C\u54C1\u540D (work)\uFF1A\u66F8\u7C4D\u3001\u96FB\u5F71\u3001\u6B4C\u66F2\u7B49\u4F5C\u54C1\u540D\u7A31\uFF0C\u9808\u4F7F\u7528\u53F0\u7063\u901A\u884C\u8B6F\u540D\u4E26\u52A0\u4E0A\u5168\u5F62\u66F8\u540D\u865F\uFF08\u4F8B\u5982\uFF1AParasite\u2192\u300A\u5BC4\u751F\u4E0A\u6D41\u300B\uFF09\u3002
</extraction_scope>
<exclusion_rules>
\u7D55\u5C0D\u4E0D\u53EF\u64F7\u53D6\u4EE5\u4E0B\u5167\u5BB9\uFF08\u9055\u53CD\u5C07\u5C0E\u81F4\u56B4\u91CD\u932F\u8AA4\uFF09\uFF1A
1. \u5728\u53F0\u7063\u5DF2\u9AD8\u5EA6\u901A\u7528\u4E14\u901A\u5E38\u4E0D\u7FFB\u8B6F\u7684\u54C1\u724C\u3001\u5E73\u53F0\u3001\u7E2E\u5BEB\u6216\u4F01\u696D\u540D\uFF08\u4F8B\u5982\uFF1AGoogle, Netflix, AI, NBA, F1, \u52DE\u529B\u58EB, \u860B\u679C, \u6296\u97F3, \u5FAE\u8EDF, \u9EA5\u7576\u52DE, \u53EF\u53E3\u53EF\u6A02, Instagram \u7B49\uFF09\u3002
2. \u4E00\u822C\u7684\u82F1\u6587\u55AE\u5B57\uFF08\u975E\u5C08\u6709\u540D\u8A5E\u7684\u666E\u901A\u540D\u8A5E\u3001\u52D5\u8A5E\u3001\u5F62\u5BB9\u8A5E\uFF09\u3002
3. \u539F\u6587\u4E2D\u50C5\u51FA\u73FE\u4E00\u6B21\u4E14\u7121\u6B67\u7FA9\u7684\u7C21\u55AE\u8A5E\u5F59\u3002
</exclusion_rules>
<output_constraints>
1. \u8A9E\u8A00\u898F\u7BC4\uFF1A\u56B4\u683C\u4F7F\u7528\u53F0\u7063\u7E41\u9AD4\u4E2D\u6587\u8207\u53F0\u7063\u6163\u7528\u8A9E\uFF0C\u7D55\u5C0D\u7981\u7528\u4E2D\u570B\u5927\u9678\u8B6F\u6CD5\uFF08\u4F8B\u5982\uFF1A\u5FC5\u9808\u4F7F\u7528\u300C\u5F71\u7247\u300D\u800C\u975E\u300C\u8996\u983B\u300D\u3001\u300C\u8EDF\u9AD4\u300D\u800C\u975E\u300C\u8EDF\u4EF6\u300D\u3001\u300C\u7A0B\u5F0F\u300D\u800C\u975E\u300C\u7A0B\u5E8F\u300D\u3001\u300C\u5BE6\u4F5C\u300D\u800C\u975E\u300C\u5BE6\u73FE\u300D\u3001\u300C\u7DDA\u7A0B\u300D\u800C\u975E\u300C\u9032\u7A0B\u300D\uFF09\u3002
2. \u6578\u91CF\u9650\u5236\uFF1A\u63D0\u53D6\u6578\u91CF\u4E0A\u9650\u70BA 200 \u689D\uFF0C\u82E5\u8D85\u904E\u8ACB\u4F9D\u91CD\u8981\u6027\u7BE9\u9078\uFF0C\u4FDD\u7559\u6700\u91CD\u8981\u7684 200 \u689D\u3002
3. \u7D55\u5C0D JSON \u683C\u5F0F\uFF1A\u53EA\u80FD\u8F38\u51FA\u7D14 JSON \u9663\u5217\uFF0C\u7D55\u5C0D\u4E0D\u53EF\u5305\u542B\u4EFB\u4F55\u524D\u8A00\u3001\u89E3\u91CB\u3001\u5F8C\u8A18\uFF0C\u4E5F\u300C\u7D55\u5C0D\u4E0D\u8981\u300D\u4F7F\u7528 \`\`\`json \u548C \`\`\` \u7684 Markdown \u7A0B\u5F0F\u78BC\u5340\u584A\u6A19\u8A18\u3002
</output_constraints>
<json_format_example>
[{"source":"Peter Hessler","target":"\u4F55\u5049","type":"person"},{"source":"Chengdu","target":"\u6210\u90FD","type":"place"},{"source":"watchfluencers","target":"\u9336\u58C7\u7DB2\u7D05\uFF08watchfluencers\uFF09","type":"tech"},{"source":"Parasite","target":"\u300A\u5BC4\u751F\u4E0A\u6D41\u300B","type":"work"}]
</json_format_example>`;
  var DEFAULT_SUBTITLE_SYSTEM_PROMPT = `\u4F60\u662F\u5C08\u696D\u7684\u5F71\u7247\u5B57\u5E55\u7FFB\u8B6F\u54E1\uFF0C\u8CA0\u8CAC\u5C07\u82F1\u6587\u5B57\u5E55\u7FFB\u8B6F\u6210\u53F0\u7063\u7E41\u9AD4\u4E2D\u6587\u3002

<critical_rules>
1. \u8F38\u51FA\u9650\u5236\uFF1A\u53EA\u8F38\u51FA\u7FFB\u8B6F\u7D50\u679C\uFF0C\u7D55\u5C0D\u4E0D\u52A0\u4EFB\u4F55\u8AAA\u660E\u3001\u89E3\u91CB\u6216\u958B\u5834\u767D\u3002
2. \u56B4\u683C\u4E00\u5C0D\u4E00\u5C0D\u61C9\uFF1A\u8F38\u5165\u6709\u5E7E\u6BB5\u5B57\u5E55\uFF0C\u8F38\u51FA\u5C31\u6709\u5E7E\u6BB5\uFF0C\u4E0D\u5408\u4F75\u3001\u4E0D\u62C6\u5206\u3001\u4E0D\u6539\u8B8A\u9806\u5E8F\u3002
3. \u53E3\u8A9E\u5316\uFF1A\u5B57\u5E55\u662F\u53E3\u8AAA\u5167\u5BB9\uFF0C\u4F7F\u7528\u53F0\u7063\u81EA\u7136\u53E3\u8A9E\uFF0C\u8A9E\u53E5\u7C21\u77ED\u76F4\u767D\uFF0C\u907F\u514D\u66F8\u9762\u8A9E\u8154\u8ABF\u3002
4. \u7981\u7528\u4E2D\u570B\u5927\u9678\u7528\u8A9E\uFF08\u7DB2\u7D61\u2192\u7DB2\u8DEF\u3001\u8996\u983B\u2192\u5F71\u7247\u3001\u8EDF\u4EF6\u2192\u8EDF\u9AD4\u3001\u6578\u64DA\u2192\u8CC7\u6599\uFF09\u3002
5. \u5C08\u6709\u540D\u8A5E\u4FDD\u7559\uFF1A\u4EBA\u540D\u3001\u54C1\u724C\u3001\u7E2E\u5BEB\uFF08\u5982 AI\u3001NASA\u3001CPU\uFF09\u4FDD\u7559\u82F1\u6587\u539F\u6587\u3002
6. \u55AE\u884C\u8F38\u51FA\uFF1A\u6BCF\u6BB5\u8F38\u5165\u53EA\u8F38\u51FA\u4E00\u884C\u9023\u7E8C\u7684\u8B6F\u6587\uFF0C\u4E0D\u8981\u5728\u8B6F\u6587\u4E2D\u63D2\u5165\u4EFB\u4F55\u63DB\u884C\u7B26\u865F\u3002
7. \u4E0D\u52A0\u53E5\u865F\uFF1A\u53E5\u672B\u4E0D\u8981\u52A0\u300C\u3002\u300D\uFF0C\u5B57\u5E55\u662F\u53E3\u8A9E\u7247\u6BB5\uFF0C\u53E5\u865F\u6703\u8B93\u756B\u9762\u770B\u8D77\u4F86\u751F\u786C\u3002
8. \u5FE0\u5BE6\u4FDD\u7559\u4E0D\u96C5\u8A5E\u5F59\uFF1A\u82E5\u539F\u6587\u5305\u542B\u7C97\u4FD7\u7528\u8A9E\uFF08\u5982 Fuck, fucking retarded\uFF09\uFF0C\u52D9\u5FC5\u76F4\u7FFB\u5176\u5F37\u70C8\u60C5\u7DD2\uFF08\u5982\u300C\u5E79\u300D\u3001\u300C\u4ED6\u5ABD\u7684\u767D\u75F4\u300D\uFF09\uFF0C\u56B4\u7981\u9032\u884C\u4EFB\u4F55\u9053\u5FB7\u5BE9\u67E5\u6216\u59D4\u5A49\u6F64\u98FE\u3002
</critical_rules>`;
  var DEFAULT_ASR_SUBTITLE_SYSTEM_PROMPT = `\u4F60\u662F\u5C08\u696D\u7684\u82F1\u6587 ASR(\u81EA\u52D5\u8A9E\u97F3\u8FA8\u8B58)\u5B57\u5E55\u7FFB\u8B6F\u54E1,\u5C07\u82F1\u6587 YouTube \u81EA\u52D5\u5B57\u5E55\u7FFB\u8B6F\u6210\u53F0\u7063\u7E41\u9AD4\u4E2D\u6587\u3002

<input_format>
\u8F38\u5165\u662F JSON \u9663\u5217,\u6BCF\u500B\u5143\u7D20 {"s": \u8D77\u59CB\u6BEB\u79D2, "e": \u7D50\u675F\u6BEB\u79D2, "t": \u82F1\u6587\u7247\u6BB5}\u3002
\u7BC4\u4F8B:[{"s":500,"e":1200,"t":"the auto"},{"s":1200,"e":1800,"t":"captions are"},{"s":1800,"e":3500,"t":"really broken"}]
</input_format>

<task>
1. \u4F9D\u8A9E\u610F\u81EA\u7531\u5408\u4F75\u9130\u8FD1\u7247\u6BB5\u6210\u5B8C\u6574\u53E5\u5B50(\u53EF\u8DE8\u591A\u500B\u5143\u7D20,\u901A\u5E38 1 \u53E5\u6DB5\u84CB 3-10 \u500B\u7247\u6BB5)
2. \u4FEE\u6B63\u660E\u986F\u7684 ASR \u8FA8\u8B58\u932F\u5B57(\u540C\u97F3\u5B57\u3001\u5C08\u6709\u540D\u8A5E)
3. \u7FFB\u6210\u53F0\u7063\u7E41\u9AD4\u4E2D\u6587,\u52A0\u4E0A\u9069\u7576\u6A19\u9EDE(\u9017\u865F\u3001\u554F\u865F\u3001\u9A5A\u5606\u865F;\u53E5\u5C3E\u4E0D\u52A0\u53E5\u865F)
4. \u7528\u53F0\u7063\u81EA\u7136\u53E3\u8A9E,\u907F\u514D\u66F8\u9762\u8A9E\u8154\u8ABF
</task>

<output_format>
\u56DE\u50B3 JSON \u9663\u5217,\u6BCF\u500B\u5143\u7D20 {"s": \u8A72\u53E5\u8D77\u59CB ms, "e": \u8A72\u53E5\u7D50\u675F ms, "t": \u4E2D\u6587\u8B6F\u6587}\u3002
- s \u5FC5\u9808\u7B49\u65BC\u67D0\u500B\u8F38\u5165\u5143\u7D20\u7684 s
- e \u5FC5\u9808\u7B49\u65BC\u67D0\u500B\u8F38\u5165\u5143\u7D20\u7684 e(\u901A\u5E38\u662F\u8A72\u53E5\u6700\u5F8C\u4E00\u500B\u7247\u6BB5\u7684 e)
- \u4E0D\u8981\u5305 \`\`\`json fence,\u76F4\u63A5\u8F38\u51FA\u7D14 JSON \u9663\u5217
- \u4E0D\u8981\u4EFB\u4F55\u89E3\u91CB\u3001\u958B\u5834\u767D\u3001\u5F8C\u8A18
\u7BC4\u4F8B:[{"s":500,"e":3500,"t":"\u81EA\u52D5\u5B57\u5E55\u771F\u7684\u58DE\u4E86"}]
</output_format>

<critical_rules>
1. \u7981\u7528\u4E2D\u570B\u5927\u9678\u7528\u8A9E(\u7DB2\u7D61\u2192\u7DB2\u8DEF\u3001\u8996\u983B\u2192\u5F71\u7247\u3001\u8EDF\u4EF6\u2192\u8EDF\u9AD4\u3001\u6578\u64DA\u2192\u8CC7\u6599\u3001\u7528\u6236\u2192\u4F7F\u7528\u8005)
2. \u5C08\u6709\u540D\u8A5E\u4FDD\u7559\u82F1\u6587(\u4EBA\u540D\u3001\u54C1\u724C\u3001\u7E2E\u5BEB\u5982 AI\u3001NASA\u3001CPU)
3. \u5FE0\u5BE6\u4FDD\u7559\u7C97\u4FD7\u7528\u8A9E(Fuck \u2192 \u5E79),\u4E0D\u5BE9\u67E5\u3001\u4E0D\u59D4\u5A49\u5316
4. \u4E0D\u8981\u907A\u6F0F\u8F38\u5165\u7247\u6BB5:\u8F38\u51FA\u9663\u5217\u52A0\u7E3D\u61C9\u6DB5\u84CB\u6240\u6709\u8F38\u5165\u6642\u9593\u7BC4\u570D
</critical_rules>`;
  var DEFAULT_FORBIDDEN_TERMS = [
    { forbidden: "\u8996\u983B", replacement: "\u5F71\u7247", note: "" },
    { forbidden: "\u97F3\u983B", replacement: "\u97F3\u8A0A", note: "" },
    { forbidden: "\u8EDF\u4EF6", replacement: "\u8EDF\u9AD4", note: "" },
    { forbidden: "\u786C\u4EF6", replacement: "\u786C\u9AD4", note: "" },
    { forbidden: "\u7A0B\u5E8F", replacement: "\u7A0B\u5F0F", note: "\u6307 program\uFF1B\u82E5\u539F\u6587\u662F procedure/process \u7528\u300C\u7A0B\u5E8F\u300D\u5C6C\u6B63\u78BA" },
    { forbidden: "\u9032\u7A0B", replacement: "\u884C\u7A0B", note: "process\uFF08\u6CE8\u610F\uFF1A\u4E0D\u662F\u300C\u7DDA\u7A0B\u300D\uFF09" },
    { forbidden: "\u7DDA\u7A0B", replacement: "\u57F7\u884C\u7DD2", note: "thread" },
    { forbidden: "\u6578\u64DA", replacement: "\u8CC7\u6599", note: "" },
    { forbidden: "\u6578\u64DA\u5EAB", replacement: "\u8CC7\u6599\u5EAB", note: "" },
    { forbidden: "\u7DB2\u7D61", replacement: "\u7DB2\u8DEF", note: "" },
    { forbidden: "\u4FE1\u606F", replacement: "\u8CC7\u8A0A", note: "" },
    { forbidden: "\u8CEA\u91CF", replacement: "\u54C1\u8CEA", note: "" },
    { forbidden: "\u7528\u6236", replacement: "\u4F7F\u7528\u8005", note: "" },
    { forbidden: "\u9ED8\u8A8D", replacement: "\u9810\u8A2D", note: "" },
    { forbidden: "\u5275\u5EFA", replacement: "\u5EFA\u7ACB", note: "" },
    { forbidden: "\u5BE6\u73FE", replacement: "\u5BE6\u4F5C", note: "" },
    { forbidden: "\u904B\u884C", replacement: "\u57F7\u884C", note: "" },
    { forbidden: "\u767C\u5E03", replacement: "\u767C\u8868", note: "" },
    { forbidden: "\u5C4F\u5E55", replacement: "\u87A2\u5E55", note: "" },
    { forbidden: "\u528D\u6307", replacement: "\u91DD\u5C0D", note: "" },
    { forbidden: "\u754C\u9762", replacement: "\u4ECB\u9762", note: "" },
    { forbidden: "\u75DB\u9EDE", replacement: "\u8981\u5BB3", note: "" },
    { forbidden: "\u786C\u50B7", replacement: "\u7F69\u9580", note: "" },
    { forbidden: "\u6587\u6A94", replacement: "\u6587\u4EF6", note: "document\uFF08\u6CE8\u610F\uFF1A\u300C\u6587\u4EF6\u300D\u5728\u53F0\u7063\u6307 document\uFF0C\u300C\u6A94\u6848\u300D\u624D\u662F file\uFF09" },
    { forbidden: "\u64CD\u4F5C\u7CFB\u7D71", replacement: "\u4F5C\u696D\u7CFB\u7D71", note: "" }
  ];
  var DEFAULT_SETTINGS = {
    apiKey: "",
    geminiConfig: {
      model: "gemini-3-flash-preview",
      // v0.83: 預設模型升級至 Gemini 3 Flash
      serviceTier: "DEFAULT",
      temperature: 1,
      // Gemini 3 Flash 原廠預設值
      topP: 0.95,
      topK: 40,
      // Gemini 3 Flash 原廠預設值（Pro 系列為 64）
      maxOutputTokens: 8192,
      systemInstruction: DEFAULT_SYSTEM_PROMPT
    },
    // 計價設定（USD per 1M tokens)。預設值為 gemini-3-flash-preview 的官方報價，
    // 使用者換模型時請自行至設定頁調整。
    pricing: {
      inputPerMTok: 0.5,
      outputPerMTok: 3
    },
    // v0.69: 全文術語表一致化設定
    glossary: {
      enabled: false,
      prompt: DEFAULT_GLOSSARY_PROMPT,
      temperature: 0.1,
      // 術語表要穩定，不要有創意
      skipThreshold: 1,
      // ≤ 此批次數完全不建術語表
      // v1.7.3: 預設從 5 提高到 10 — 中等長度頁面(6-10 批)走 fire-and-forget 不阻塞,
      // 省下 EXTRACT_GLOSSARY 1.5-7.4 秒 blocking 等待;短頁本就跳過、長頁(>10 批)
      // 仍 blocking 確保跨批次術語一致。使用者可在設定頁 0(永遠 fire-and-forget)
      // ~ 50(極長頁才 blocking)區間調整。
      blockingThreshold: 10,
      // > 此批次數則阻塞等術語表回來再翻譯
      timeoutMs: 6e4,
      // 術語表請求逾時（毫秒），超過則 fallback（v0.70: 60s）
      maxTerms: 200,
      // 術語表上限條目數
      // v1.7.2: 術語表獨立模型。空字串表示「跟主翻譯同一個 model」(舊行為);
      // 預設 'gemini-3.1-flash-lite-preview' — 術語抽取任務簡單,Flash Lite 比 Flash 快
      // 1.5-3 倍且便宜 5 倍。實測啟用 glossary 時 EXTRACT_GLOSSARY 用 Flash 耗時
      // 1.5-7.4 秒,改用 Flash Lite 預期可壓到 0.5-2.5 秒。
      model: "gemini-3.1-flash-lite-preview"
    },
    domainRules: { whitelist: [] },
    autoTranslate: false,
    debugLog: false,
    // v1.2.11: YouTube 字幕翻譯設定
    ytSubtitle: {
      autoTranslate: true,
      // 偵測到 YouTube 影片時自動翻譯字幕
      temperature: 1,
      // 字幕翻譯 temperature 預設值
      systemPrompt: DEFAULT_SUBTITLE_SYSTEM_PROMPT,
      windowSizeS: 30,
      // 每批翻譯涵蓋的秒數（預設 30 秒）
      lookaheadS: 10,
      // 在字幕快用完前幾秒觸發下一批（預設 10 秒）
      debugToast: false,
      // v1.2.14: 顯示字幕翻譯即時狀態面板（debug 用）
      onTheFly: false,
      // v1.2.49: cache miss 時是否送 on-the-fly API 翻譯（預設關閉）
      // preserveLineBreaks 已於 v1.2.38 移除 toggle，改為永遠 true（content-youtube.js 硬編碼）
      // v1.4.0: 字幕翻譯引擎——'gemini'（預設）或 'google'（Google Translate 免費端點）
      engine: "gemini",
      // v1.2.39: 獨立模型設定——空字串表示與主模型相同
      model: "",
      // v1.2.39: 獨立計價——null 表示與主模型計價相同；設定後用於字幕費用計算
      pricing: null,
      // v1.5.8: 字幕路徑「是否套用固定術語表 / 中國用語黑名單」。預設 false 省 token——
      // 字幕本來就走獨立 prompt 設計，且字幕短句 LLM 不太會誤翻黑名單詞，套用收益小、
      // 而每批 prompt 多 300–500 token 的開銷在高頻字幕場景累積可觀。
      applyFixedGlossary: false,
      applyForbiddenTerms: false,
      // v1.6.20: ASR(YouTube 自動字幕)分句模式。內部三值,UI 簡化為單一 toggle(v1.6.23):
      //   'heuristic'   = 預設分句:純 client-side 啟發式,延遲最低(~1-2s)。toggle 關閉時用。
      //   'progressive' = 混合模式(預設):先 heuristic 顯示(秒出),同時 LLM 跑覆蓋成更精緻版本。
      //                   兼顧速度與品質。toggle 開啟時用(預設)。
      //   'llm'         = 純 LLM 自由分句(內部保留,UI 不再可選)。
      asrMode: "progressive",
      // commit 5c:雙語對照模式。預設 false=純中文(YouTube 既有行為:CSS 隱藏原生 CC;
      // Drive 透過 postMessage unloadModule 關 player CC)。true=中英對照(原生 CC + 中文 overlay)
      bilingualMode: false
    },
    // v0.35 新增：並行翻譯 rate limiter 設定
    // tier 對應 Gemini API 付費層級(free / tier1 / tier2),決定 RPM/TPM/RPD 上限
    // override 欄位若為 null 則使用 tier 對照表的值,非 null 時覆寫
    tier: "tier1",
    safetyMargin: 0.1,
    maxRetries: 3,
    rpmOverride: null,
    tpmOverride: null,
    rpdOverride: null,
    // 每個 tab 同時最多飛出幾個翻譯批次(content.js 側的並發上限,與 limiter 雙重保險)
    maxConcurrentBatches: 10,
    // v1.0.2: 每批段數上限與字元預算，使用者可在設定頁自行調整。
    // 段數上限：避免單批 placeholder slot 過多導致 LLM 對齊失準。
    // 字元預算：作為 token proxy（3500 chars ≈ 1000 英文 tokens），留足 output headroom。
    maxUnitsPerBatch: DEFAULT_UNITS_PER_BATCH,
    maxCharsPerBatch: DEFAULT_CHARS_PER_BATCH,
    // v1.0.1: 單頁翻譯段落數上限。超大頁面（如維基百科長條目）超過此上限時截斷。
    // 設為 0 表示不限制。
    maxTranslateUnits: 1e3,
    // v1.8.3:「只翻文章開頭」節省模式。enabled=true 時只翻 batch 0(經 prioritizeUnits
    // 推前的文章開頭 N 段),跳過 batch 1+,大幅減少 token 用量。使用者想看完整翻譯時
    // 關閉此選項並重新翻譯,前面已翻好的段落會從本地快取自動命中(不重複收費)。
    // maxUnits 範圍 5-50;chars 限制走內部 BATCH0_CHARS=3700 不暴露給使用者。
    partialMode: {
      enabled: false,
      maxUnits: 25
    },
    // v1.0.17: Toast 透明度（0.1–1.0），讓使用者在無限捲動網站上降低 toast 干擾
    toastOpacity: 0.7,
    // v1.1.3: Toast 自動關閉——翻譯完成/錯誤等 toast 在數秒後自動消失。
    // 預設開啟。關閉時翻譯完成 toast 需手動點 × 或點擊外部區域才會消失。
    toastAutoHide: true,
    // v1.6.8: 是否顯示翻譯進度通知（toast 系統 master switch）。
    // 預設 true 維持現有行為。false 時 SK.showToast() 入口直接 return：
    // 不建 DOM、不開 Shadow root、不發訊息（與單純調 opacity=0 不同——後者仍會渲染）。
    // 使用情境：使用者翻譯流量大、不在乎個別頁面進度，希望全靜音。
    showProgressToast: true,
    // v1.0.21: 頁面層級繁體中文偵測開關。開啟時若整頁文字以繁中為主則跳過不翻譯；
    // 關閉時不做頁面層級檢查（元素層級仍會個別跳過繁中段落）。
    // Gmail 等介面語言為繁中但內容多為英文的網站，可關閉此選項。
    skipTraditionalChinesePage: true,
    // v1.5.0: 顯示模式（'single' 覆蓋 / 'dual' 雙語對照），由 popup toggle 切換。
    // 'single' 沿用 v1.4 之前所有路徑，'dual' 走 content-inject.js 的 injectDual。
    displayMode: "single",
    // v1.5.0: 雙語模式下的視覺標記樣式（'tint' 淡底色 / 'bar' 左邊細條 / 'dashed' 波浪底線 / 'none'）
    translationMarkStyle: "tint",
    // v1.4.12: 三組翻譯預設對應 Alt+A / Alt+S / Alt+D 三個快速鍵。
    // engine='gemini' 時 model 覆蓋 geminiConfig.model，其他欄位（prompt、temperature、glossary）沿用全域；
    // engine='google' 時走 Google Translate 路徑，不需 model。
    // label 顯示於 options 頁（未來 toast 也可用）。
    // 行為：閒置按 → 啟動對應 preset；翻譯中按 → abort；已翻譯按任意 → restorePage。
    translatePresets: [
      { slot: 1, engine: "gemini", model: "gemini-3.1-flash-lite-preview", label: "Flash Lite" },
      { slot: 2, engine: "gemini", model: "gemini-3-flash-preview", label: "Flash" },
      { slot: 3, engine: "google", model: null, label: "Google MT" }
    ],
    // v1.5.6: 中國用語黑名單。使用者自訂時整個陣列覆蓋（不做 per-entry merge）。
    // 內容會以 <forbidden_terms_blacklist> 區塊注入到 systemInstruction 末端，
    // 且修改清單後快取 key 會帶 _b<hash> 後綴讓既有快取自動失效。
    forbiddenTerms: DEFAULT_FORBIDDEN_TERMS,
    // v1.6.1: 「不再顯示更新提示」toggle。預設 false（顯示提示）。
    // 對應 storage.local 的 updateAvailable 物件由 lib/update-check.js 寫入，不在 sync。
    disableUpdateNotice: false,
    // v1.6.6: 工具列「翻譯本頁」按鈕對應的 preset slot（1/2/3）。
    // 預設 slot 2 = Flash（與 v1.4.12 開始 popup 按鈕硬碼映射的行為一致）。
    // 使用者可在一般設定改成其他 preset，按 popup 按鈕等同按該 slot 的快速鍵。
    popupButtonSlot: 2,
    // v1.6.13: 自動翻譯網站(白名單)觸發時要用哪一組 preset。預設 slot 2 = Flash。
    // 修法前自動翻譯路徑直接 SK.translatePage() 不帶 slot,fallback 全域 geminiConfig.model;
    // 使用者改 preset model 後 Alt+S 走新 model,但白名單路徑仍走全域 → UX 不一致。
    // 改成走 SK.handleTranslatePreset(autoTranslateSlot) 後,白名單與快速鍵行為對齊。
    autoTranslateSlot: 2,
    // v1.6.14: per-model 計價覆蓋表。Google 改價時內建表(lib/model-pricing.js)會過時,
    // 使用者可在「Gemini 分頁 → 模型計價」針對 lite/flash/pro 個別覆蓋。
    // 結構:{ [modelName]: { inputPerMTok, outputPerMTok } };空欄位或缺 entry → fallback 內建表。
    modelPricingOverrides: {},
    // v1.5.7: 自訂 OpenAI-compatible Provider。
    // engine='openai-compat' 的 preset 會走 lib/openai-compat.js 透過 chat.completions
    // endpoint 翻譯，可接 OpenRouter / Together / DeepSeek / Groq / Ollama 等 provider。
    // apiKey 不存 sync（getSettings 會從 storage.local 的 customProviderApiKey 注入），
    // systemPrompt 獨立於 Gemini（黑名單與固定術語表仍共用、由 buildEffectiveSystemInstruction 注入），
    // 但「預設值」與 Gemini 相同——使用者第一次打開分頁就有完整可用的 prompt，要動再動。
    //
    // v1.6.16: baseUrl/model/pricing 預填 OpenRouter DeepSeek V4 Pro,使用者只要填 API Key
    // 就能啟動。資料來源 https://openrouter.ai/deepseek/deepseek-v4-pro(2026-04 校準)。
    // 既有使用者升級後若 storage 內已有 customProvider entry(例如打開過自訂模型分頁),
    // 此預設不會覆蓋(getSettings 對 customProvider 走淺 merge,saved 在後);要套用新預設
    // 需手動清空欄位或重新匯入設定。新使用者第一次打開設定頁就看到預填值。
    customProvider: {
      baseUrl: "https://openrouter.ai/api/v1",
      model: "deepseek/deepseek-v4-pro",
      systemPrompt: DEFAULT_SYSTEM_PROMPT,
      // 預設與 Gemini 相同；空字串時 adapter 套用簡短 fallback
      temperature: 0.7,
      inputPerMTok: 0.435,
      // OpenRouter DeepSeek V4 Pro Standard tier 參考價
      outputPerMTok: 0.87,
      // v1.6.18: thinking 控制(統一 5 級對映 + 進階 JSON 透傳)。
      //   thinkingLevel:'auto' 不送任何 thinking 參數,讓 provider 自選預設(最安全 fallback);
      //   'off' / 'low' / 'medium' / 'high' 由 lib/openai-compat-thinking.js 偵測 provider 後
      //   翻譯成對應 API 寫法(OpenRouter unified reasoning / DeepSeek extra_body.thinking /
      //   Claude thinking.type / OpenAI o reasoning_effort / Grok reasoning_effort / Qwen
      //   extra_body.enable_thinking)。
      //   extraBodyJson:使用者自填 JSON 字串,deep merge 到 request body,可覆蓋自動 mapping
      //   並加 provider 專屬參數(top_k / metadata 等)。預設空白(進階使用者才需要)。
      thinkingLevel: "auto",
      extraBodyJson: ""
    }
  };
  var API_KEY_STORAGE_KEY = "apiKey";
  var CUSTOM_PROVIDER_API_KEY = "customProviderApiKey";
  var LEGACY_SYNC_KEYS = [
    "ytPreserveLineBreaks",
    // v1.2.38 移除(YouTube 字幕保留換行,改為永遠 true)
    "preserveLineBreaks"
    // 同上(全頁翻譯版本,更早期)
  ];
  var _legacyCleanupDone = false;
  async function cleanupLegacySyncKeys() {
    if (_legacyCleanupDone) return;
    _legacyCleanupDone = true;
    try {
      const saved = await browser.storage.sync.get(LEGACY_SYNC_KEYS);
      const present = LEGACY_SYNC_KEYS.filter((k) => k in saved);
      if (present.length > 0) {
        await browser.storage.sync.remove(present);
      }
    } catch {
      _legacyCleanupDone = false;
    }
  }
  async function migrateApiKeyIfNeeded(syncSaved) {
    if (!syncSaved || typeof syncSaved.apiKey !== "string") return;
    const { [API_KEY_STORAGE_KEY]: localKey } = await browser.storage.local.get(API_KEY_STORAGE_KEY);
    if (!localKey && syncSaved.apiKey) {
      await browser.storage.local.set({ [API_KEY_STORAGE_KEY]: syncSaved.apiKey });
    }
    await browser.storage.sync.remove("apiKey");
  }
  var _settingsCachePromise = null;
  var _settingsCacheListenerBound = false;
  function _bindSettingsCacheInvalidator() {
    if (_settingsCacheListenerBound) return;
    _settingsCacheListenerBound = true;
    browser.storage.onChanged.addListener(() => {
      _settingsCachePromise = null;
    });
  }
  async function getSettingsCached() {
    _bindSettingsCacheInvalidator();
    if (!_settingsCachePromise) {
      _settingsCachePromise = getSettings().catch((err) => {
        _settingsCachePromise = null;
        throw err;
      });
    }
    return _settingsCachePromise;
  }
  async function getSettings() {
    const saved = await browser.storage.sync.get(null);
    await migrateApiKeyIfNeeded(saved);
    const { [API_KEY_STORAGE_KEY]: apiKey = "" } = await browser.storage.local.get(API_KEY_STORAGE_KEY);
    const merged = {
      ...DEFAULT_SETTINGS,
      ...saved,
      geminiConfig: { ...DEFAULT_SETTINGS.geminiConfig, ...saved.geminiConfig || {} },
      pricing: { ...DEFAULT_SETTINGS.pricing, ...saved.pricing || {} },
      domainRules: { ...DEFAULT_SETTINGS.domainRules, ...saved.domainRules || {} },
      glossary: { ...DEFAULT_SETTINGS.glossary, ...saved.glossary || {} },
      // v1.2.39: 深層 merge ytSubtitle，確保新欄位（model / pricing）有預設值
      ytSubtitle: { ...DEFAULT_SETTINGS.ytSubtitle, ...saved.ytSubtitle || {} },
      // v1.8.3: partialMode 深層 merge,確保 maxUnits 預設值有 fallback
      partialMode: { ...DEFAULT_SETTINGS.partialMode, ...saved.partialMode || {} },
      // v1.4.12: translatePresets——使用者自訂三組就完全以自訂為準（不做 per-slot merge），
      // 否則套用預設三組。陣列非空時視為使用者已自訂。
      translatePresets: Array.isArray(saved.translatePresets) && saved.translatePresets.length > 0 ? saved.translatePresets : DEFAULT_SETTINGS.translatePresets,
      // v1.5.6: forbiddenTerms 陣列。使用者一旦寫入（即使空陣列代表「停用黑名單」）
      // 就完全以 saved 為準；未曾寫入時才套用預設清單。
      forbiddenTerms: Array.isArray(saved.forbiddenTerms) ? saved.forbiddenTerms : DEFAULT_SETTINGS.forbiddenTerms,
      // v1.5.7: customProvider 深層 merge（保留新欄位預設值）
      customProvider: { ...DEFAULT_SETTINGS.customProvider, ...saved.customProvider || {} }
    };
    merged.apiKey = apiKey;
    const { [CUSTOM_PROVIDER_API_KEY]: cpApiKey = "" } = await browser.storage.local.get(CUSTOM_PROVIDER_API_KEY);
    merged.customProvider.apiKey = cpApiKey;
    return merged;
  }

  // shinkansen/lib/logger.js
  var MAX_LOGS = 1e3;
  var logBuffer = [];
  var logSeq = 0;
  var PERSIST_CATEGORIES = /* @__PURE__ */ new Set(["youtube", "api", "rate-limit"]);
  var PERSIST_KEY = "yt_debug_log";
  var PERSIST_MAX = 100;
  function persistLog(entry) {
    if (!PERSIST_CATEGORIES.has(entry.category)) return;
    browser.storage.local.get(PERSIST_KEY).then((result) => {
      const logs = result[PERSIST_KEY] || [];
      logs.push(entry);
      if (logs.length > PERSIST_MAX) logs.splice(0, logs.length - PERSIST_MAX);
      return browser.storage.local.set({ [PERSIST_KEY]: logs });
    }).catch(() => {
    });
  }
  async function getPersistedLogs() {
    const result = await browser.storage.local.get(PERSIST_KEY);
    return result[PERSIST_KEY] || [];
  }
  async function clearPersistedLogs() {
    await browser.storage.local.remove(PERSIST_KEY);
  }
  function debugLog(level, category, message, data) {
    const entry = {
      seq: ++logSeq,
      t: (/* @__PURE__ */ new Date()).toISOString(),
      level,
      category: category || "system",
      message,
      data: sanitize(data)
    };
    logBuffer.push(entry);
    while (logBuffer.length > MAX_LOGS) logBuffer.shift();
    persistLog(entry);
    getSettingsCached().then((settings) => {
      if (settings.debugLog) {
        const tag = `[Shinkansen][${category}]`;
        if (level === "error") console.error(tag, message, data);
        else if (level === "warn") console.warn(tag, message, data);
        else console.log(tag, message, data);
      }
    }).catch(() => {
    });
  }
  function getLogs(afterSeq = 0) {
    const filtered = afterSeq > 0 ? logBuffer.filter((e) => e.seq > afterSeq) : logBuffer.slice();
    return {
      logs: filtered,
      latestSeq: logSeq
    };
  }
  function clearLogs() {
    logBuffer.length = 0;
  }
  function sanitize(data) {
    if (data == null) return void 0;
    try {
      const s = JSON.stringify(data);
      if (s.length > 3e3) return JSON.parse(s.slice(0, 3e3) + "\u2026(\u622A\u65B7)");
      return JSON.parse(s);
    } catch {
      return String(data);
    }
  }

  // shinkansen/lib/system-instruction.js
  var DELIMITER = "\n<<<SHINKANSEN_SEP>>>\n";
  var MAX_UNITS_PER_CHUNK = DEFAULT_UNITS_PER_BATCH;
  var MAX_CHARS_PER_CHUNK = DEFAULT_CHARS_PER_BATCH;
  function packChunks(texts) {
    const batches = [];
    let cur = null;
    const flush = () => {
      if (cur && cur.end > cur.start) batches.push(cur);
      cur = null;
    };
    for (let i = 0; i < texts.length; i++) {
      const len = (texts[i] || "").length;
      if (len > MAX_CHARS_PER_CHUNK) {
        flush();
        batches.push({ start: i, end: i + 1 });
        continue;
      }
      if (cur && (cur.chars + len > MAX_CHARS_PER_CHUNK || cur.end - cur.start >= MAX_UNITS_PER_CHUNK)) {
        flush();
      }
      if (!cur) cur = { start: i, end: i, chars: 0 };
      cur.end = i + 1;
      cur.chars += len;
    }
    flush();
    return batches;
  }
  function buildEffectiveSystemInstruction(baseSystem, texts, joined, glossary, fixedGlossary, forbiddenTerms) {
    const parts = [baseSystem];
    if (texts.length > 1) {
      parts.push(
        `\u984D\u5916\u898F\u5247\uFF08\u591A\u6BB5\u7FFB\u8B6F\u5206\u9694\u7B26\u8207\u5E8F\u865F\uFF0C\u6975\u91CD\u8981\uFF09:
\u672C\u6279\u6B21\u5305\u542B ${texts.length} \u6BB5\u6587\u5B57\u3002\u6BCF\u6BB5\u958B\u982D\u6709\u5E8F\u865F\u6A19\u8A18 \xABN\xBB\uFF08N \u70BA 1 \u5230 ${texts.length}\uFF09\uFF0C\u6BB5\u8207\u6BB5\u4E4B\u9593\u4EE5\u5206\u9694\u7B26 <<<SHINKANSEN_SEP>>> \u9694\u958B\u3002
\u4F60\u7684\u8F38\u51FA\u5FC5\u9808\uFF1A
- \u6BCF\u6BB5\u8B6F\u6587\u958B\u982D\u4E5F\u52A0\u4E0A\u5C0D\u61C9\u7684\u5E8F\u865F\u6A19\u8A18 \xABN\xBB\uFF08N \u8207\u8F38\u5165\u7684\u5E8F\u865F\u4E00\u4E00\u5C0D\u61C9\uFF09
- \u6BB5\u8207\u6BB5\u4E4B\u9593\u7528\u5B8C\u5168\u76F8\u540C\u7684\u5206\u9694\u7B26 <<<SHINKANSEN_SEP>>> \u9694\u958B
- \u6070\u597D\u8F38\u51FA ${texts.length} \u6BB5\u8B6F\u6587\u548C ${texts.length - 1} \u500B\u5206\u9694\u7B26
- \u4E0D\u53EF\u5408\u4F75\u6BB5\u843D\u3001\u4E0D\u53EF\u7701\u7565\u5206\u9694\u7B26\u3001\u4E0D\u53EF\u589E\u6E1B\u6BB5\u6578`
      );
    }
    if (texts.some((t) => t && t.indexOf("\n") !== -1)) {
      parts.push(
        '\u984D\u5916\u898F\u5247\uFF08\u6BB5\u843D\u5206\u9694\uFF09:\n\u8F38\u5165\u4E2D\u53EF\u80FD\u542B\u6709\u6BB5\u5167\u63DB\u884C\u7B26 \\n\uFF08\u4F8B\u5982 "\u7B2C\u4E00\u6BB5\\n\\n\u7B2C\u4E8C\u6BB5"\uFF09,\u4EE3\u8868\u539F\u6587\u6709\u5C0D\u61C9\u7684\u6BB5\u843D\u6216\u884C\u5206\u9694\uFF08\u901A\u5E38\u662F <br> \u6216 <br><br>\uFF09\u3002\u7FFB\u8B6F\u6642\u5FC5\u9808\u5728\u5C0D\u61C9\u4F4D\u7F6E\u539F\u6A23\u4FDD\u7559 \\n \u5B57\u5143\u2014\u2014\u8B6F\u6587\u6BB5\u843D\u6578\u8207\u8F38\u5165\u6BB5\u843D\u6578\u4E00\u81F4,\u9023\u7E8C\u5169\u500B \\n \u4E5F\u8981\u4FDD\u7559\u5169\u500B\u3002\u4E0D\u53EF\u628A\u6BB5\u843D\u5408\u4F75\u6210\u4E00\u884C,\u4E5F\u4E0D\u53EF\u628A\u7A7A\u767D\u884C\u591A\u585E\u6216\u5C11\u585E\u3002'
      );
    }
    if (joined.indexOf("\u27E6") !== -1) {
      parts.push(
        "\u984D\u5916\u898F\u5247\uFF08\u6975\u91CD\u8981\uFF0C\u8655\u7406\u4F54\u4F4D\u7B26\u6A19\u8A18\uFF09:\n\u8F38\u5165\u4E2D\u53EF\u80FD\u542B\u6709\u5169\u7A2E\u4F54\u4F4D\u7B26\u6A19\u8A18\uFF0C\u90FD\u662F\u7528\u4F86\u4FDD\u7559\u539F\u6587\u7D50\u69CB\uFF0C\u5FC5\u9808\u539F\u6A23\u4FDD\u7559\u3001\u4E0D\u53EF\u7FFB\u8B6F\u3001\u4E0D\u53EF\u7701\u7565\u3001\u4E0D\u53EF\u6539\u5BEB\u3001\u4E0D\u53EF\u65B0\u589E\u3001\u4E0D\u53EF\u91CD\u6392\u3002\u4F54\u4F4D\u7B26\u88E1\u7684\u6578\u5B57\u3001\u659C\u7DDA\u3001\u661F\u865F **\u5FC5\u9808\u662F\u534A\u5F62 ASCII \u5B57\u5143**\uFF080-9\u3001/\u3001*\uFF09\uFF0C\u7D55\u5C0D\u4E0D\u53EF\u6539\u6210\u5168\u5F62\uFF08\uFF10-\uFF19\u3001\uFF0F\u3001\uFF0A\uFF09\uFF0C\u5426\u5247\u7A0B\u5F0F\u7121\u6CD5\u914D\u5C0D\u6703\u6574\u6BB5\u5D29\u58DE\u3002\n\n\uFF08A\uFF09\u914D\u5C0D\u578B \u27E6\u6578\u5B57\u27E7\u2026\u27E6/\u6578\u5B57\u27E7\uFF08\u4F8B\u5982 \u27E60\u27E7Tokugawa Ieyasu\u27E6/0\u27E7)\uFF1A\n- \u628A\u6A19\u8A18\u8996\u70BA\u900F\u660E\u5916\u6BBC\u3002\u5916\u6BBC\u300C\u5167\u90E8\u300D\u7684\u6587\u5B57\u8DDF\u5916\u6BBC\u300C\u5916\u90E8\u300D\u7684\u6587\u5B57\u4E00\u6A23\uFF0C\u5168\u90E8\u90FD\u8981\u7FFB\u8B6F\u6210\u7E41\u9AD4\u4E2D\u6587\u3002\n- \u27E6\u6578\u5B57\u27E7 \u8207 \u27E6/\u6578\u5B57\u27E7 \u5169\u500B\u6A19\u8A18\u672C\u8EAB\u539F\u6A23\u4FDD\u7559\uFF0C\u6578\u5B57\u4E0D\u8B8A\u3002\n- **\u914D\u5C0D\u578B\u53EF\u4EE5\u5DE2\u72C0\u5D4C\u5957**\uFF08\u4F8B\u5982 \u27E60\u27E7may incorporate text from a \u27E61\u27E7large language model\u27E6/1\u27E7, which is ...\u27E6/0\u27E7\uFF09\u3002\u5DE2\u72C0\u4EE3\u8868\u539F\u6587\u662F `<b>text <a>link</a> more text</b>` \u9019\u985E\u5D4C\u5957\u7D50\u69CB\u3002\u7FFB\u8B6F\u6642\u5FC5\u9808**\u540C\u6642**\u4FDD\u7559\u5916\u5C64\u8207\u5167\u5C64\u5169\u7D44\u6A19\u8A18\u3001\u4E0D\u53EF\u6241\u5E73\u5316\u6210\u55AE\u5C64\u3001\u4E0D\u53EF\u4EA4\u63DB\u9806\u5E8F\u3001\u4E0D\u53EF\u907A\u6F0F\u4EFB\u4F55\u4E00\u5C64\u3002\u5916\u5C64\u8207\u5167\u5C64\u7684\u5167\u90E8\u6587\u5B57\u5168\u90E8\u8981\u7FFB\u6210\u7E41\u9AD4\u4E2D\u6587\u3002\n\n\uFF08B\uFF09\u81EA\u9589\u5408 \u27E6*\u6578\u5B57\u27E7\uFF08\u4F8B\u5982 \u27E6*5\u27E7)\uFF1A\n- \u9019\u662F\u300C\u539F\u5B50\u4FDD\u7559\u300D\u4F4D\u7F6E\u8A18\u865F\uFF0C\u4EE3\u8868\u539F\u6587\u88E1\u6709\u4E00\u6BB5\u4E0D\u53EF\u7FFB\u8B6F\u7684\u5C0F\u5340\u584A\uFF08\u4F8B\u5982\u7DAD\u57FA\u767E\u79D1\u8173\u8A3B\u53C3\u7167 [2])\u3002\n- \u6574\u500B \u27E6*\u6578\u5B57\u27E7 token \u539F\u6A23\u4FDD\u7559\uFF0C\u4E0D\u53EF\u62C6\u958B\u3001\u4E0D\u53EF\u7FFB\u8B6F\u3001\u4E0D\u53EF\u7701\u7565\uFF0C\u6578\u5B57\u4E0D\u8B8A\u3002\n- \u5B83\u7684\u4F4D\u7F6E\u4EE3\u8868\u90A3\u6BB5\u5167\u5BB9\u61C9\u8A72\u63D2\u5728\u8B6F\u6587\u7684\u54EA\u88E1\u3002\n\n\u5177\u9AD4\u7BC4\u4F8B 1\uFF08\u55AE\u5C64\uFF09\uFF1A\n\u8F38\u5165\uFF1A \u27E60\u27E7Tokugawa Ieyasu\u27E6/0\u27E7 won the \u27E61\u27E7Battle of Sekigahara\u27E6/1\u27E7 in 1600.\u27E6*2\u27E7\n\u6B63\u78BA\u8F38\u51FA\uFF1A \u27E60\u27E7\u5FB7\u5DDD\u5BB6\u5EB7\u27E6/0\u27E7\u65BC 1600 \u5E74\u8D0F\u5F97\u27E61\u27E7\u95DC\u539F\u4E4B\u6230\u27E6/1\u27E7\u3002\u27E6*2\u27E7\n\u932F\u8AA4\u8F38\u51FA 1\uFF1A \u27E60\u27E7Tokugawa Ieyasu\u27E6/0\u27E7\u65BC 1600 \u5E74\u8D0F\u5F97\u27E61\u27E7Battle of Sekigahara\u27E6/1\u27E7\u3002\u27E6*2\u27E7\uFF08\u914D\u5C0D\u578B\u5167\u90E8\u82F1\u6587\u6C92\u7FFB\uFF09\n\u932F\u8AA4\u8F38\u51FA 2\uFF1A \u27E60\u27E7\u5FB7\u5DDD\u5BB6\u5EB7\u27E6/0\u27E7\u65BC 1600 \u5E74\u8D0F\u5F97\u27E61\u27E7\u95DC\u539F\u4E4B\u6230\u27E6/1\u27E7\u3002[2]\uFF08\u81EA\u9589\u5408 \u27E6*2\u27E7 \u88AB\u64C5\u81EA\u9084\u539F\u6210 [2])\n\n\u5177\u9AD4\u7BC4\u4F8B 2\uFF08\u5DE2\u72C0\uFF09\uFF1A\n\u8F38\u5165\uFF1A This article \u27E60\u27E7may incorporate text from a \u27E61\u27E7large language model\u27E6/1\u27E7, which is \u27E62\u27E7prohibited in Wikipedia articles\u27E6/2\u27E7\u27E6/0\u27E7.\n\u6B63\u78BA\u8F38\u51FA\uFF1A \u672C\u689D\u76EE\u27E60\u27E7\u53EF\u80FD\u5305\u542B\u4F86\u81EA\u27E61\u27E7\u5927\u578B\u8A9E\u8A00\u6A21\u578B\u27E6/1\u27E7\u7684\u6587\u5B57\uFF0C\u9019\u5728\u27E62\u27E7\u7DAD\u57FA\u767E\u79D1\u689D\u76EE\u4E2D\u662F\u88AB\u7981\u6B62\u7684\u27E6/2\u27E7\u27E6/0\u27E7\u3002\n\u932F\u8AA4\u8F38\u51FA 3\uFF1A \u672C\u689D\u76EE\u53EF\u80FD\u5305\u542B\u4F86\u81EA\u27E61\u27E7\u5927\u578B\u8A9E\u8A00\u6A21\u578B\u27E6/1\u27E7\u7684\u6587\u5B57\uFF0C\u9019\u5728\u27E62\u27E7\u7DAD\u57FA\u767E\u79D1\u689D\u76EE\u4E2D\u662F\u88AB\u7981\u6B62\u7684\u27E6/2\u27E7\u3002\uFF08\u5916\u5C64 \u27E60\u27E7\u2026\u27E6/0\u27E7 \u88AB\u6241\u5E73\u5316\u4E1F\u6389\uFF09"
      );
    }
    if (glossary && glossary.length > 0) {
      const lines = glossary.map((e) => `${e.source} \u2192 ${e.target}`).join("\n");
      parts.push(
        "\u4EE5\u4E0B\u662F\u672C\u7BC7\u6587\u7AE0\u7684\u8853\u8A9E\u5C0D\u7167\u8868\uFF0C\u9047\u5230\u9019\u4E9B\u539F\u6587\u4E00\u5F8B\u4F7F\u7528\u6307\u5B9A\u8B6F\u540D\uFF0C\u4E0D\u53EF\u81EA\u884C\u6539\u5BEB\uFF0C\u4E5F\u4E0D\u9700\u52A0\u8A3B\u82F1\u6587\u539F\u6587\uFF1A\n" + lines
      );
    }
    if (fixedGlossary && fixedGlossary.length > 0) {
      const lines = fixedGlossary.map((e) => `${e.source} \u2192 ${e.target}`).join("\n");
      parts.push(
        "\u4EE5\u4E0B\u662F\u4F7F\u7528\u8005\u6307\u5B9A\u7684\u56FA\u5B9A\u8853\u8A9E\u8868\uFF0C\u512A\u5148\u7D1A\u9AD8\u65BC\u4E0A\u65B9\u6240\u6709\u8853\u8A9E\u5C0D\u7167\u3002\u9047\u5230\u9019\u4E9B\u539F\u6587\u4E00\u5F8B\u4F7F\u7528\u6307\u5B9A\u8B6F\u540D\uFF0C\u4E0D\u53EF\u81EA\u884C\u6539\u5BEB\uFF0C\u4E5F\u4E0D\u9700\u52A0\u8A3B\u82F1\u6587\u539F\u6587\uFF1A\n" + lines
      );
    }
    if (forbiddenTerms && forbiddenTerms.length > 0) {
      const tableLines = forbiddenTerms.map((t) => `${t.forbidden} \u2192 ${t.replacement}`).join("\n");
      parts.push(
        "<forbidden_terms_blacklist>\n\u6975\u91CD\u8981\uFF1A\u4EE5\u4E0B\u662F\u56B4\u683C\u7981\u7528\u7684\u4E2D\u570B\u5927\u9678\u7528\u8A9E\u9ED1\u540D\u55AE\u3002\u8B6F\u6587\u4E2D\u7D55\u5C0D\u4E0D\u53EF\u4F7F\u7528\u5DE6\u6B04\u8A5E\u5F59\uFF0C\u5FC5\u9808\u6539\u7528\u53F3\u6B04\u7684\u53F0\u7063\u6163\u7528\u8A9E\u3002\u5373\u4F7F\u539F\u6587\u662F\u82F1\u6587\uFF08\u4F8B\u5982 video / software / data\uFF09\uFF0C\u8B6F\u6587\u4E5F\u53EA\u80FD\u4F7F\u7528\u53F3\u6B04\u3002\u9055\u53CD\u6B64\u898F\u5247\u5373\u70BA\u932F\u8AA4\u7FFB\u8B6F\u3002\n\n\u7981\u7528 \u2192 \u5FC5\u9808\u6539\u7528\n" + tableLines + "\n\n\u8AAA\u660E\uFF1A\u672C\u9ED1\u540D\u55AE\u70BA\u786C\u6027\u898F\u5B9A\uFF0C\u512A\u5148\u7D1A\u9AD8\u65BC\u4EFB\u4F55 stylistic \u8003\u91CF\u3002\u82E5\u8A72\u8A5E\u70BA\u6587\u7AE0\u672C\u8EAB\u8A0E\u8AD6\u7684\u4E3B\u984C\uFF08\u4F8B\u5982\u4E00\u7BC7\u5206\u6790\u300C\u4E2D\u570B\u79D1\u6280\u7528\u8A9E\u6F14\u8B8A\u300D\u7684\u6587\u7AE0\uFF09\uFF0C\u8ACB\u4F7F\u7528\u5F15\u865F\u6A19\u793A\u5F8C\u4FDD\u7559\u539F\u8A5E\uFF0C\u4F8B\u5982\u300C\u8996\u983B\u300D\u3002\n</forbidden_terms_blacklist>"
      );
    }
    return parts.join("\n\n");
  }

  // shinkansen/lib/gemini.js
  var MAX_BACKOFF_MS = 8e3;
  var DailyQuotaExceededError = class extends Error {
    constructor(message) {
      super(message);
      this.name = "DailyQuotaExceededError";
    }
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function pickThinkingConfig(model) {
    const isPro = /pro/i.test(String(model || ""));
    return { thinkingLevel: isPro ? "low" : "minimal" };
  }
  function extractQuotaDimension(json) {
    const details = json?.error?.details;
    if (!Array.isArray(details)) return null;
    for (const d of details) {
      const metric = d?.quotaMetric || d?.metric || "";
      const id = d?.quotaId || "";
      const haystack = `${metric} ${id}`.toLowerCase();
      if (haystack.includes("perday") || haystack.includes("_day")) return "RPD";
      if (haystack.includes("tokens") && haystack.includes("minute")) return "TPM";
      if (haystack.includes("requests") && haystack.includes("minute")) return "RPM";
    }
    return null;
  }
  async function fetchWithRetry(url, body, { maxRetries = 3 } = {}) {
    let attempt = 0;
    while (true) {
      let resp;
      try {
        resp = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
      } catch (err) {
        await debugLog("error", "api", "gemini fetch network error", { error: err.message, attempt });
        if (attempt >= maxRetries) throw new Error("\u7DB2\u8DEF\u932F\u8AA4\uFF1A" + err.message);
        await sleep(Math.min(MAX_BACKOFF_MS, 500 * Math.pow(2, attempt)));
        attempt += 1;
        continue;
      }
      if (resp.status >= 500 && resp.status < 600) {
        await debugLog("warn", "api", `gemini ${resp.status} server error`, { status: resp.status, attempt });
        if (attempt >= maxRetries) {
          let errMsg = `HTTP ${resp.status}`;
          try {
            const j = await resp.json();
            errMsg = j?.error?.message || errMsg;
          } catch {
          }
          throw new Error(errMsg);
        }
        await sleep(Math.min(MAX_BACKOFF_MS, 500 * Math.pow(2, attempt)));
        attempt += 1;
        continue;
      }
      if (resp.status !== 429) return resp;
      let bodyJson = null;
      try {
        bodyJson = await resp.clone().json();
      } catch {
      }
      const dim = extractQuotaDimension(bodyJson);
      const retryAfterHeader = resp.headers.get("retry-after");
      const retryAfterSec = retryAfterHeader ? parseInt(retryAfterHeader, 10) : NaN;
      await debugLog("warn", "api", "gemini 429 rate limit", {
        dimension: dim,
        retryAfter: retryAfterHeader,
        attempt,
        error: bodyJson?.error?.message
      });
      if (dim === "RPD") {
        throw new DailyQuotaExceededError("\u4ECA\u65E5 Gemini API \u914D\u984D\u5DF2\u7528\u76E1(RPD \u9054\u4E0A\u9650),\u8ACB\u660E\u5929\u518D\u8A66\u6216\u5347\u7D1A\u4ED8\u8CBB\u5C64\u7D1A\u3002");
      }
      if (attempt >= maxRetries) {
        const msg = bodyJson?.error?.message || `HTTP 429(${dim || "\u672A\u77E5\u7DAD\u5EA6"})`;
        throw new Error(msg);
      }
      const waitMs = Number.isFinite(retryAfterSec) && retryAfterSec > 0 ? retryAfterSec * 1e3 + 100 : Math.min(MAX_BACKOFF_MS, 500 * Math.pow(2, attempt));
      await sleep(waitMs);
      attempt += 1;
    }
  }
  async function extractGlossary(compressedText, settings) {
    const { apiKey, geminiConfig, glossary: glossaryConfig } = settings;
    const {
      serviceTier,
      topP,
      topK,
      maxOutputTokens
    } = geminiConfig;
    const model = (glossaryConfig?.model || "").trim() || geminiConfig.model;
    const glossaryPrompt = glossaryConfig?.prompt || "";
    const glossaryTemperature = glossaryConfig?.temperature ?? 0.1;
    const maxTerms = glossaryConfig?.maxTerms ?? 200;
    const fetchTimeoutMs = glossaryConfig?.fetchTimeoutMs ?? 55e3;
    const glossaryMaxOutput = Math.max(maxOutputTokens || 0, 4096);
    const body = {
      contents: [{ role: "user", parts: [{ text: compressedText }] }],
      systemInstruction: { parts: [{ text: glossaryPrompt }] },
      generationConfig: {
        temperature: glossaryTemperature,
        topP,
        topK,
        maxOutputTokens: glossaryMaxOutput,
        // v1.6.12:Pro 系列改用 thinkingLevel='low'(無法完全關閉 thinking),Flash
        // 系列用 'minimal'(thoughts=0,等同舊 budget=0)。詳見 pickThinkingConfig 註解。
        thinkingConfig: pickThinkingConfig(model)
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
      ]
    };
    if (serviceTier && serviceTier !== "DEFAULT") {
      body.service_tier = serviceTier.toLowerCase();
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
    await debugLog("info", "glossary", "glossary extraction request", { model, chars: compressedText.length, fetchTimeoutMs, maxOutputTokens: glossaryMaxOutput, settingsMaxOutput: maxOutputTokens });
    const t0 = Date.now();
    const controller = new AbortController();
    const abortTimer = setTimeout(() => controller.abort(), fetchTimeoutMs);
    let resp;
    try {
      resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal
      });
    } catch (err) {
      clearTimeout(abortTimer);
      const reason = err.name === "AbortError" ? `fetch timeout (${fetchTimeoutMs}ms)` : "network error";
      await debugLog("error", "glossary", `glossary extraction failed (${reason})`, { error: err.message, elapsed: Date.now() - t0 });
      return { glossary: [], usage: { inputTokens: 0, outputTokens: 0, cachedTokens: 0 }, _diag: `${reason}: ${err.message}` };
    }
    clearTimeout(abortTimer);
    let json;
    try {
      json = await resp.json();
    } catch (parseErr) {
      await debugLog("error", "glossary", "glossary response body parse failed", { status: resp.status, error: parseErr.message });
      return { glossary: [], usage: { inputTokens: 0, outputTokens: 0, cachedTokens: 0 }, _diag: `resp.json() failed: ${parseErr.message}` };
    }
    const ms = Date.now() - t0;
    const meta = json?.usageMetadata || {};
    const usage = {
      inputTokens: meta.promptTokenCount || 0,
      outputTokens: meta.candidatesTokenCount || 0,
      cachedTokens: meta.cachedContentTokenCount || 0
    };
    if (!resp.ok) {
      const errMsg = json?.error?.message || `HTTP ${resp.status}`;
      await debugLog("error", "glossary", "glossary extraction failed (API)", { status: resp.status, error: errMsg, elapsed: ms });
      return { glossary: [], usage, _diag: `API error ${resp.status}: ${errMsg}` };
    }
    const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const finishReason = json?.candidates?.[0]?.finishReason || "unknown";
    await debugLog("info", "glossary", "glossary extraction response", {
      elapsed: ms,
      usage: meta,
      rawChars: rawText.length,
      finishReason
    });
    let jsonStr = rawText.trim();
    const fenceMatch = jsonStr.match(/```(?:json)?\s*\n?([\s\S]*?)```/);
    if (fenceMatch) {
      jsonStr = fenceMatch[1].trim();
    } else {
      const firstBracket = jsonStr.search(/[\[{]/);
      const lastBracket = Math.max(jsonStr.lastIndexOf("]"), jsonStr.lastIndexOf("}"));
      if (firstBracket !== -1 && lastBracket > firstBracket) {
        jsonStr = jsonStr.slice(firstBracket, lastBracket + 1);
      }
    }
    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (parseErr) {
      await debugLog("warn", "glossary", "glossary JSON parse failed", {
        error: parseErr.message,
        finishReason,
        preview: rawText.slice(0, 500)
      });
      return { glossary: [], usage, _diag: `JSON parse error (finishReason=${finishReason}): ${parseErr.message}, preview: ${rawText.slice(0, 300)}` };
    }
    let entries;
    if (Array.isArray(parsed)) {
      entries = parsed;
    } else if (parsed && typeof parsed === "object") {
      const arrKey = Object.keys(parsed).find((k) => Array.isArray(parsed[k]));
      entries = arrKey ? parsed[arrKey] : null;
    }
    if (!entries) {
      await debugLog("warn", "glossary", "glossary result: no array found in response", {
        type: typeof parsed,
        keys: parsed ? Object.keys(parsed).slice(0, 5) : []
      });
      return { glossary: [], usage, _diag: `no array in response (rawText first 500): ${rawText.slice(0, 500)}` };
    }
    if (entries.length === 0) {
      return { glossary: [], usage, _diag: `entries array is empty (rawText first 500): ${rawText.slice(0, 500)}` };
    }
    const glossary = entries.filter((e) => e && typeof e.source === "string" && typeof e.target === "string" && e.source && e.target).slice(0, maxTerms);
    if (entries.length > 0 && glossary.length === 0) {
      const sampleDiag = JSON.stringify(entries.slice(0, 3)).slice(0, 500);
      return { glossary: [], usage, _diag: `entries=${entries.length} but 0 valid (missing source/target?). samples: ${sampleDiag}` };
    }
    await debugLog("info", "glossary", "glossary extraction done", {
      totalEntries: entries.length,
      validTerms: glossary.length,
      elapsed: ms,
      finishReason
    });
    return { glossary, usage };
  }
  async function translateBatch(texts, settings, glossary, fixedGlossary, forbiddenTerms) {
    if (!texts?.length) return { translations: [], usage: { inputTokens: 0, outputTokens: 0, cachedTokens: 0 }, hadMismatch: false };
    const out = new Array(texts.length);
    const usage = { inputTokens: 0, outputTokens: 0, cachedTokens: 0 };
    let hadMismatch = false;
    const chunks = packChunks(texts);
    for (const { start, end } of chunks) {
      const slice = texts.slice(start, end);
      const result = await translateChunk(slice, settings, glossary, fixedGlossary, forbiddenTerms);
      for (let j = 0; j < result.parts.length; j++) out[start + j] = result.parts[j];
      usage.inputTokens += result.usage.inputTokens;
      usage.outputTokens += result.usage.outputTokens;
      usage.cachedTokens += result.usage.cachedTokens || 0;
      if (result.hadMismatch) hadMismatch = true;
    }
    return { translations: out, usage, hadMismatch };
  }
  async function translateChunk(texts, settings, glossary, fixedGlossary, forbiddenTerms) {
    if (!texts?.length) return [];
    const { apiKey, geminiConfig } = settings;
    const {
      model,
      serviceTier,
      temperature,
      topP,
      topK,
      maxOutputTokens,
      systemInstruction
    } = geminiConfig;
    const useSeqMarkers = texts.length > 1;
    const markedTexts = useSeqMarkers ? texts.map((t, i) => `\xAB${i + 1}\xBB ${t}`) : texts;
    const joined = markedTexts.join(DELIMITER);
    const effectiveSystem = buildEffectiveSystemInstruction(systemInstruction, texts, joined, glossary, fixedGlossary, forbiddenTerms);
    const body = {
      contents: [{ role: "user", parts: [{ text: joined }] }],
      systemInstruction: { parts: [{ text: effectiveSystem }] },
      generationConfig: {
        temperature,
        topP,
        topK,
        maxOutputTokens,
        // v1.6.12:依模型動態選 thinkingLevel('low' for Pro, 'minimal' for Flash)。
        // 詳見 pickThinkingConfig 註解;Pro 強制 thinking 不能用 budget=0。
        thinkingConfig: pickThinkingConfig(model)
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
      ]
    };
    if (serviceTier && serviceTier !== "DEFAULT") {
      body.service_tier = serviceTier.toLowerCase();
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
    await debugLog("info", "api", "gemini request", {
      model,
      serviceTier,
      segments: texts.length,
      chars: joined.length,
      // v1.5.7: 送進 LLM 的原文前 300 字 — 將來任何「譯文沒按預期出現」都能對照原文 / 譯文確認 LLM 行為
      inputPreview: joined.slice(0, 300),
      // v1.5.8: 本批 prompt 末端注入的「自動術語表 / 固定術語表 / 禁用詞清單」實際條數，
      // 讓使用者從 Debug 分頁看出：YouTube 字幕的兩個 toggle 是否生效、文章翻譯有沒有讀到設定
      glossaryCount: glossary?.length || 0,
      fixedGlossaryCount: fixedGlossary?.length || 0,
      forbiddenTermsCount: forbiddenTerms?.length || 0
    });
    const t0 = Date.now();
    const maxRetries = typeof settings?.maxRetries === "number" ? settings.maxRetries : 3;
    const resp = await fetchWithRetry(url, body, { maxRetries });
    let json;
    try {
      json = await resp.json();
    } catch (parseErr) {
      const ms2 = Date.now() - t0;
      let rawPreview = "";
      try {
        rawPreview = await resp.clone().text().then((t) => t.slice(0, 200));
      } catch {
      }
      await debugLog("error", "api", "gemini response body is not JSON", {
        status: resp.status,
        elapsed: ms2,
        parseError: parseErr.message,
        rawPreview
      });
      throw new Error(`Gemini API \u56DE\u61C9\u683C\u5F0F\u7570\u5E38\uFF08\u975E JSON\uFF09\uFF1AHTTP ${resp.status}\u3002${rawPreview ? "\u56DE\u61C9\u524D 200 \u5B57\u5143\uFF1A" + rawPreview : ""}`);
    }
    const ms = Date.now() - t0;
    if (!resp.ok) {
      await debugLog("error", "api", "gemini error", { status: resp.status, elapsed: ms, error: json?.error?.message });
      const msg = json?.error?.message || `HTTP ${resp.status}`;
      throw new Error(msg);
    }
    const candidate = json?.candidates?.[0];
    const finishReason = candidate?.finishReason || "unknown";
    const text = candidate?.content?.parts?.[0]?.text || "";
    const blockReason = json?.promptFeedback?.blockReason;
    if (blockReason) {
      await debugLog("error", "api", "gemini prompt blocked", { blockReason, elapsed: ms });
      throw new Error(`Gemini \u62D2\u7D55\u8655\u7406\u6B64\u8ACB\u6C42\uFF08promptFeedback.blockReason: ${blockReason}\uFF09\u3002\u53EF\u80FD\u662F\u5B89\u5168\u904E\u6FFE\u5668\u8AA4\u5224\uFF0C\u8ACB\u5617\u8A66\u7E2E\u77ED\u6BB5\u843D\u6216\u8ABF\u6574\u5167\u5BB9\u3002`);
    }
    if (!candidate || !text) {
      await debugLog("error", "api", "gemini empty candidates", {
        elapsed: ms,
        finishReason,
        candidatesLength: json?.candidates?.length || 0,
        promptFeedback: json?.promptFeedback
      });
      const reasonMessages = {
        SAFETY: "\u5167\u5BB9\u88AB Gemini \u5B89\u5168\u904E\u6FFE\u5668\u64CB\u4E0B\u3002\u53EF\u80FD\u662F\u539F\u6587\u542B\u6709\u654F\u611F\u5167\u5BB9\uFF0C\u8ACB\u5617\u8A66\u8DF3\u904E\u6B64\u6BB5\u843D\u3002",
        RECITATION: "Gemini \u5075\u6E2C\u5230\u8F38\u51FA\u8207\u5DF2\u77E5\u4F5C\u54C1\u9AD8\u5EA6\u91CD\u8907\uFF08recitation filter\uFF09\uFF0C\u8ACB\u5617\u8A66\u7E2E\u77ED\u6BB5\u843D\u3002",
        MAX_TOKENS: "\u8F38\u51FA\u8D85\u904E maxOutputTokens \u4E0A\u9650\u3002\u8ACB\u5230\u8A2D\u5B9A\u9801\u63D0\u9AD8\u4E0A\u9650\uFF0C\u6216\u6E1B\u5C11\u6BCF\u6279\u6BB5\u843D\u6578\u3002",
        OTHER: "Gemini \u56DE\u50B3\u7A7A\u5167\u5BB9\uFF08finishReason: OTHER\uFF09\uFF0C\u539F\u56E0\u4E0D\u660E\u3002\u8ACB\u7A0D\u5F8C\u91CD\u8A66\u3002"
      };
      const friendlyMsg = reasonMessages[finishReason] || `Gemini \u56DE\u50B3\u7A7A\u5167\u5BB9\uFF08finishReason: ${finishReason}\uFF09\u3002`;
      throw new Error(friendlyMsg);
    }
    if (finishReason && finishReason !== "STOP" && finishReason !== "unknown") {
      await debugLog("warn", "api", "gemini unusual finishReason", { finishReason, elapsed: ms, textLength: text.length });
    }
    const meta = json?.usageMetadata || {};
    const chunkUsage = {
      inputTokens: meta.promptTokenCount || 0,
      outputTokens: meta.candidatesTokenCount || 0,
      // Gemini 2.5+ implicit context caching 命中的 token 數（輸入 tokens 的子集）。
      // 未命中或舊模型時欄位不會出現，用 || 0 防呆。
      cachedTokens: meta.cachedContentTokenCount || 0
    };
    await debugLog("info", "api", "gemini response", {
      elapsed: ms,
      segments: texts.length,
      inputTokens: chunkUsage.inputTokens,
      outputTokens: chunkUsage.outputTokens,
      cachedTokens: chunkUsage.cachedTokens,
      finishReason,
      // v1.5.7: LLM 回應的譯文前 300 字 — 與 'gemini request' 的 inputPreview 對照即可診斷
      // 「LLM echo 原文」「譯文被截斷」「譯文跟期望不一樣」這類 case，不必 attach 真實 API 中介。
      outputPreview: text.slice(0, 300)
    });
    const SEQ_MARKER_RE = /^«\d+»\s*/;
    const parts = text.split(DELIMITER).map((s) => s.trim().replace(SEQ_MARKER_RE, ""));
    if (parts.length !== texts.length) {
      await debugLog("warn", "api", "segment count mismatch \u2014 fallback to per-segment", {
        expected: texts.length,
        got: parts.length,
        elapsed: ms
      });
      if (texts.length === 1) {
        return { parts: [text.trim()], usage: chunkUsage };
      }
      const aligned = [];
      const aggUsage = { ...chunkUsage };
      const tFallback0 = Date.now();
      for (let fi = 0; fi < texts.length; fi++) {
        const tSeg0 = Date.now();
        const r = await translateChunk([texts[fi]], settings, glossary, fixedGlossary, forbiddenTerms);
        await debugLog("info", "api", `fallback segment ${fi + 1}/${texts.length}`, { elapsed: Date.now() - tSeg0 });
        aligned.push(r.parts[0] || "");
        aggUsage.inputTokens += r.usage.inputTokens;
        aggUsage.outputTokens += r.usage.outputTokens;
        aggUsage.cachedTokens += r.usage.cachedTokens || 0;
      }
      await debugLog("warn", "api", "fallback complete", { segments: texts.length, fallbackElapsed: Date.now() - tFallback0, originalElapsed: ms });
      return { parts: aligned, usage: aggUsage, hadMismatch: true };
    }
    return { parts, usage: chunkUsage, hadMismatch: false };
  }
  async function translateBatchStream(texts, settings, glossary, fixedGlossary, forbiddenTerms, callbacks = {}, signal = void 0) {
    if (!texts?.length) {
      return { translations: [], usage: { inputTokens: 0, outputTokens: 0, cachedTokens: 0 }, hadMismatch: false, finishReason: "STOP" };
    }
    const { apiKey, geminiConfig } = settings;
    const { model, serviceTier, temperature, topP, topK, maxOutputTokens, systemInstruction } = geminiConfig;
    const useSeqMarkers = texts.length > 1;
    const markedTexts = useSeqMarkers ? texts.map((t, i) => `\xAB${i + 1}\xBB ${t}`) : texts;
    const joined = markedTexts.join(DELIMITER);
    const effectiveSystem = buildEffectiveSystemInstruction(systemInstruction, texts, joined, glossary, fixedGlossary, forbiddenTerms);
    const body = {
      contents: [{ role: "user", parts: [{ text: joined }] }],
      systemInstruction: { parts: [{ text: effectiveSystem }] },
      generationConfig: {
        temperature,
        topP,
        topK,
        maxOutputTokens,
        thinkingConfig: pickThinkingConfig(model)
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
      ]
    };
    if (serviceTier && serviceTier !== "DEFAULT") body.service_tier = serviceTier.toLowerCase();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse&key=${encodeURIComponent(apiKey)}`;
    await debugLog("info", "api", "gemini stream request", {
      model,
      segments: texts.length,
      chars: joined.length,
      inputPreview: joined.slice(0, 200),
      glossaryCount: glossary?.length || 0,
      fixedGlossaryCount: fixedGlossary?.length || 0
    });
    const t0 = Date.now();
    const SEQ_MARKER_RE = /^«\d+»\s*/;
    let resp;
    try {
      resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal
      });
    } catch (err) {
      if (signal?.aborted || err?.name === "AbortError") {
        throw new Error("streaming aborted");
      }
      throw err;
    }
    if (!resp.ok) {
      let errText = "";
      try {
        errText = await resp.text();
      } catch (_) {
      }
      await debugLog("error", "api", "gemini stream HTTP error", { status: resp.status, error: errText.slice(0, 200) });
      throw new Error(`Gemini API HTTP ${resp.status}${errText ? ": " + errText.slice(0, 200) : ""}`);
    }
    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let allText = "";
    let firstChunkFired = false;
    let segmentsEmitted = 0;
    let lastUsage = { inputTokens: 0, outputTokens: 0, cachedTokens: 0 };
    let finishReason = "unknown";
    let blockReason = null;
    function tryEmitSegments() {
      if (!callbacks.onSegment) return;
      const allParts = allText.split(DELIMITER);
      const numComplete = allParts.length - 1;
      while (segmentsEmitted < numComplete && segmentsEmitted < texts.length) {
        const segText = allParts[segmentsEmitted].trim().replace(SEQ_MARKER_RE, "");
        callbacks.onSegment(segmentsEmitted, segText, false);
        segmentsEmitted++;
      }
    }
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (!firstChunkFired) {
          firstChunkFired = true;
          try {
            callbacks.onFirstChunk?.();
          } catch (_) {
          }
        }
        buffer += decoder.decode(value, { stream: true });
        while (true) {
          const m = buffer.match(/\r?\n\r?\n/);
          if (!m) break;
          const eventBlock = buffer.slice(0, m.index);
          buffer = buffer.slice(m.index + m[0].length);
          if (!eventBlock.startsWith("data: ")) continue;
          const dataStr = eventBlock.slice(6);
          let json;
          try {
            json = JSON.parse(dataStr);
          } catch (_) {
            continue;
          }
          const candidate = json?.candidates?.[0];
          const partText = candidate?.content?.parts?.[0]?.text || "";
          const fr = candidate?.finishReason;
          if (fr) finishReason = fr;
          if (json?.promptFeedback?.blockReason) blockReason = json.promptFeedback.blockReason;
          if (partText) {
            allText += partText;
            tryEmitSegments();
          }
          const meta = json?.usageMetadata;
          if (meta) {
            lastUsage = {
              inputTokens: meta.promptTokenCount || 0,
              outputTokens: meta.candidatesTokenCount || 0,
              cachedTokens: meta.cachedContentTokenCount || 0
            };
          }
        }
      }
    } catch (err) {
      if (signal?.aborted || err?.name === "AbortError") {
        throw new Error("streaming aborted");
      }
      throw err;
    } finally {
      try {
        reader.releaseLock?.();
      } catch (_) {
      }
    }
    const elapsed = Date.now() - t0;
    if (callbacks.onSegment) {
      const allParts = allText.split(DELIMITER);
      while (segmentsEmitted < allParts.length && segmentsEmitted < texts.length) {
        const segText = allParts[segmentsEmitted].trim().replace(SEQ_MARKER_RE, "");
        callbacks.onSegment(segmentsEmitted, segText, false);
        segmentsEmitted++;
      }
    }
    await debugLog("info", "api", "gemini stream response", {
      elapsed,
      segments: texts.length,
      segmentsEmitted,
      inputTokens: lastUsage.inputTokens,
      outputTokens: lastUsage.outputTokens,
      cachedTokens: lastUsage.cachedTokens,
      finishReason,
      outputPreview: allText.slice(0, 300)
    });
    if (blockReason) {
      throw new Error(`Gemini \u62D2\u7D55\u8655\u7406\u6B64\u8ACB\u6C42(promptFeedback.blockReason: ${blockReason})`);
    }
    if (allText.length === 0) {
      const reasonMsg = {
        SAFETY: "\u5167\u5BB9\u88AB Gemini \u5B89\u5168\u904E\u6FFE\u5668\u64CB\u4E0B",
        RECITATION: "Gemini \u5075\u6E2C\u5230\u8F38\u51FA\u8207\u5DF2\u77E5\u4F5C\u54C1\u9AD8\u5EA6\u91CD\u8907(recitation filter)",
        MAX_TOKENS: "\u8F38\u51FA\u8D85\u904E maxOutputTokens \u4E0A\u9650",
        OTHER: "Gemini \u56DE\u50B3\u7A7A\u5167\u5BB9(finishReason: OTHER)"
      };
      throw new Error(reasonMsg[finishReason] || `Gemini \u56DE\u50B3\u7A7A\u5167\u5BB9(finishReason: ${finishReason})`);
    }
    const translations = allText.split(DELIMITER).map((s) => s.trim().replace(SEQ_MARKER_RE, ""));
    const hadMismatch = translations.length !== texts.length;
    if (hadMismatch) {
      await debugLog("warn", "api", "gemini stream segment mismatch", {
        expected: texts.length,
        got: translations.length,
        elapsed
      });
    }
    return {
      translations,
      usage: lastUsage,
      hadMismatch,
      finishReason
    };
  }

  // shinkansen/lib/openai-compat-thinking.js
  function detectProvider(baseUrl, model) {
    const url = String(baseUrl || "").toLowerCase();
    const m = String(model || "").toLowerCase();
    if (/openrouter\.ai/.test(url)) return "openrouter";
    if (/api\.deepseek\.com/.test(url)) return "deepseek";
    if (/api\.anthropic\.com|claude/.test(url)) return "claude";
    if (/api\.x\.ai/.test(url)) return "grok";
    if (/api\.openai\.com/.test(url) && /^o[1-9]/.test(m)) return "openai-o";
    if (/dashscope|aliyun/.test(url)) return "qwen";
    if (/^anthropic\/|claude/.test(m)) return "claude";
    if (/^deepseek\//.test(m)) return "deepseek";
    if (/^openai\/o|^o[1-9]/.test(m)) return "openai-o";
    if (/grok/.test(m)) return "grok";
    if (/qwen|qwq/.test(m)) return "qwen";
    return "unknown";
  }
  function buildNativeThinking(provider, level) {
    if (!level || level === "auto") return {};
    switch (provider) {
      case "openrouter":
        if (level === "off") return { reasoning: { exclude: true } };
        return { reasoning: { effort: level } };
      case "deepseek":
        return { extra_body: { thinking: { type: level === "off" ? "disabled" : "enabled" } } };
      case "claude":
        if (level === "off") return { thinking: { type: "disabled" } };
        return { thinking: { type: "adaptive" } };
      case "openai-o":
        return { reasoning_effort: level === "off" ? "minimal" : level };
      case "grok":
        if (level === "off") return {};
        return { reasoning_effort: level };
      case "qwen":
        return { extra_body: { enable_thinking: level !== "off" } };
      case "unknown":
      default:
        return {};
    }
  }
  function safeParseJson(raw, onWarn) {
    if (!raw || typeof raw !== "string") return {};
    const trimmed = raw.trim();
    if (!trimmed) return {};
    try {
      const v = JSON.parse(trimmed);
      if (v && typeof v === "object" && !Array.isArray(v)) return v;
      if (onWarn) onWarn("extraBodyJson \u4E0D\u662F\u7269\u4EF6,\u5DF2\u5FFD\u7565");
      return {};
    } catch (e) {
      if (onWarn) onWarn(`extraBodyJson \u89E3\u6790\u5931\u6557: ${e.message}`);
      return {};
    }
  }
  function deepMerge(a, b) {
    if (!isPlainObject(b)) return b === void 0 ? a : b;
    if (!isPlainObject(a)) return { ...b };
    const out = { ...a };
    for (const k of Object.keys(b)) {
      if (isPlainObject(a[k]) && isPlainObject(b[k])) {
        out[k] = deepMerge(a[k], b[k]);
      } else {
        out[k] = b[k];
      }
    }
    return out;
  }
  function isPlainObject(v) {
    return v !== null && typeof v === "object" && !Array.isArray(v);
  }
  function buildThinkingPayload({ baseUrl, model, level, extraBodyRaw, onWarn }) {
    const provider = detectProvider(baseUrl, model);
    const native = buildNativeThinking(provider, level);
    const extra = safeParseJson(extraBodyRaw, onWarn);
    return deepMerge(native, extra);
  }

  // shinkansen/lib/openai-compat.js
  var MAX_BACKOFF_MS2 = 8e3;
  function sleep2(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function fetchWithRetry2(url, headers, body, { maxRetries = 3 } = {}) {
    let attempt = 0;
    while (true) {
      let resp;
      try {
        resp = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...headers },
          body: JSON.stringify(body)
        });
      } catch (err) {
        await debugLog("error", "api", "openai-compat fetch network error", { error: err.message, attempt });
        if (attempt >= maxRetries) throw new Error("\u7DB2\u8DEF\u932F\u8AA4\uFF1A" + err.message);
        await sleep2(Math.min(MAX_BACKOFF_MS2, 500 * Math.pow(2, attempt)));
        attempt += 1;
        continue;
      }
      if (resp.status >= 500 && resp.status < 600) {
        await debugLog("warn", "api", `openai-compat ${resp.status} server error`, { status: resp.status, attempt });
        if (attempt >= maxRetries) {
          let errMsg = `HTTP ${resp.status}`;
          try {
            const j = await resp.json();
            errMsg = j?.error?.message || errMsg;
          } catch {
          }
          throw new Error(errMsg);
        }
        await sleep2(Math.min(MAX_BACKOFF_MS2, 500 * Math.pow(2, attempt)));
        attempt += 1;
        continue;
      }
      if (resp.status !== 429) return resp;
      let bodyJson = null;
      try {
        bodyJson = await resp.clone().json();
      } catch {
      }
      const retryAfterHeader = resp.headers.get("retry-after");
      const retryAfterSec = retryAfterHeader ? parseInt(retryAfterHeader, 10) : NaN;
      await debugLog("warn", "api", "openai-compat 429 rate limit", {
        retryAfter: retryAfterHeader,
        attempt,
        error: bodyJson?.error?.message
      });
      if (attempt >= maxRetries) {
        const msg = bodyJson?.error?.message || `HTTP 429`;
        throw new Error(msg);
      }
      const waitMs = Number.isFinite(retryAfterSec) && retryAfterSec > 0 ? retryAfterSec * 1e3 + 100 : Math.min(MAX_BACKOFF_MS2, 500 * Math.pow(2, attempt));
      await sleep2(waitMs);
      attempt += 1;
    }
  }
  function resolveChatCompletionsUrl(baseUrl) {
    if (!baseUrl) throw new Error("customProvider.baseUrl \u672A\u8A2D\u5B9A");
    const trimmed = String(baseUrl).trim().replace(/\/+$/, "");
    if (/\/chat\/completions$/.test(trimmed)) return trimmed;
    return trimmed + "/chat/completions";
  }
  async function translateBatch2(texts, settings, glossary, fixedGlossary, forbiddenTerms) {
    if (!texts?.length) return { translations: [], usage: { inputTokens: 0, outputTokens: 0, cachedTokens: 0 }, hadMismatch: false };
    const out = new Array(texts.length);
    const usage = { inputTokens: 0, outputTokens: 0, cachedTokens: 0 };
    let hadMismatch = false;
    const chunks = packChunks(texts);
    for (const { start, end } of chunks) {
      const slice = texts.slice(start, end);
      const result = await translateChunk2(slice, settings, glossary, fixedGlossary, forbiddenTerms);
      for (let j = 0; j < result.parts.length; j++) out[start + j] = result.parts[j];
      usage.inputTokens += result.usage.inputTokens;
      usage.outputTokens += result.usage.outputTokens;
      usage.cachedTokens += result.usage.cachedTokens || 0;
      if (result.hadMismatch) hadMismatch = true;
    }
    return { translations: out, usage, hadMismatch };
  }
  async function translateChunk2(texts, settings, glossary, fixedGlossary, forbiddenTerms) {
    if (!texts?.length) return { parts: [], usage: { inputTokens: 0, outputTokens: 0, cachedTokens: 0 } };
    const cp = settings.customProvider || {};
    const { baseUrl, model, systemPrompt, temperature, apiKey, thinkingLevel, extraBodyJson } = cp;
    if (!model) throw new Error("\u5C1A\u672A\u8A2D\u5B9A\u81EA\u8A02 Provider \u7684\u6A21\u578B ID\u3002");
    const useSeqMarkers = texts.length > 1;
    const markedTexts = useSeqMarkers ? texts.map((t, i) => `\xAB${i + 1}\xBB ${t}`) : texts;
    const joined = markedTexts.join(DELIMITER);
    const baseSystem = typeof systemPrompt === "string" && systemPrompt.trim() ? systemPrompt : "\u4F60\u662F\u5C08\u696D\u7684\u82F1\u6587 \u2192 \u7E41\u9AD4\u4E2D\u6587\uFF08\u53F0\u7063\u6163\u7528\u8A9E\uFF09\u7FFB\u8B6F\u52A9\u7406\uFF0C\u50C5\u8F38\u51FA\u8B6F\u6587\u4E0D\u52A0\u4EFB\u4F55\u8AAA\u660E\u3002";
    const effectiveSystem = buildEffectiveSystemInstruction(baseSystem, texts, joined, glossary, fixedGlossary, forbiddenTerms);
    const thinkingPayload = buildThinkingPayload({
      baseUrl,
      model,
      level: thinkingLevel || "auto",
      extraBodyRaw: extraBodyJson || "",
      onWarn: (msg) => {
        debugLog("warn", "api", `customProvider thinking config: ${msg}`);
      }
    });
    const body = {
      model,
      messages: [
        { role: "system", content: effectiveSystem },
        { role: "user", content: joined }
      ],
      temperature: typeof temperature === "number" ? temperature : 0.7,
      stream: false,
      ...thinkingPayload
    };
    const url = resolveChatCompletionsUrl(baseUrl);
    const headers = apiKey ? { "Authorization": `Bearer ${apiKey}` } : {};
    await debugLog("info", "api", "openai-compat request", {
      baseUrl,
      model,
      segments: texts.length,
      chars: joined.length,
      inputPreview: joined.slice(0, 300),
      // v1.5.7: 對齊 gemini.js
      // v1.5.8: 本批 prompt 末端注入的條數（同 gemini.js）
      glossaryCount: glossary?.length || 0,
      fixedGlossaryCount: fixedGlossary?.length || 0,
      forbiddenTermsCount: forbiddenTerms?.length || 0
    });
    const t0 = Date.now();
    const maxRetries = typeof settings?.maxRetries === "number" ? settings.maxRetries : 3;
    const resp = await fetchWithRetry2(url, headers, body, { maxRetries });
    let json;
    try {
      json = await resp.json();
    } catch (parseErr) {
      const ms2 = Date.now() - t0;
      let rawPreview = "";
      try {
        rawPreview = await resp.clone().text().then((t) => t.slice(0, 200));
      } catch {
      }
      await debugLog("error", "api", "openai-compat response not JSON", {
        status: resp.status,
        elapsed: ms2,
        parseError: parseErr.message,
        rawPreview
      });
      throw new Error(`\u81EA\u8A02 Provider \u56DE\u61C9\u683C\u5F0F\u7570\u5E38\uFF08\u975E JSON\uFF09\uFF1AHTTP ${resp.status}\u3002${rawPreview ? "\u524D 200 \u5B57\uFF1A" + rawPreview : ""}`);
    }
    const ms = Date.now() - t0;
    if (!resp.ok) {
      const errMsg = json?.error?.message || `HTTP ${resp.status}`;
      await debugLog("error", "api", "openai-compat error", { status: resp.status, elapsed: ms, error: errMsg });
      throw new Error(errMsg);
    }
    const choice = json?.choices?.[0];
    const finishReason = choice?.finish_reason || "unknown";
    const text = choice?.message?.content || "";
    if (!text) {
      await debugLog("error", "api", "openai-compat empty content", {
        elapsed: ms,
        finishReason,
        choicesLength: json?.choices?.length || 0
      });
      throw new Error(`\u81EA\u8A02 Provider \u56DE\u50B3\u7A7A\u5167\u5BB9\uFF08finish_reason: ${finishReason}\uFF09\u3002`);
    }
    const u = json?.usage || {};
    const chunkUsage = {
      inputTokens: u.prompt_tokens || 0,
      outputTokens: u.completion_tokens || 0,
      // OpenAI 2024-09 起加的 cache 命中欄位（OpenRouter 也支援）
      cachedTokens: u.prompt_tokens_details?.cached_tokens || u.cached_tokens || 0
    };
    await debugLog("info", "api", "openai-compat response", {
      elapsed: ms,
      segments: texts.length,
      inputTokens: chunkUsage.inputTokens,
      outputTokens: chunkUsage.outputTokens,
      cachedTokens: chunkUsage.cachedTokens,
      finishReason,
      outputPreview: text.slice(0, 300)
      // v1.5.7: 對齊 gemini.js
    });
    const SEQ_MARKER_RE = /^«\d+»\s*/;
    const parts = text.split(DELIMITER).map((s) => s.trim().replace(SEQ_MARKER_RE, ""));
    if (parts.length !== texts.length) {
      await debugLog("warn", "api", "openai-compat segment count mismatch \u2014 fallback to per-segment", {
        expected: texts.length,
        got: parts.length,
        elapsed: ms
      });
      if (texts.length === 1) {
        return { parts: [text.trim()], usage: chunkUsage, hadMismatch: false };
      }
      const aligned = [];
      const aggUsage = { ...chunkUsage };
      for (let fi = 0; fi < texts.length; fi++) {
        const r = await translateChunk2([texts[fi]], settings, glossary, fixedGlossary, forbiddenTerms);
        aligned.push(r.parts[0] || "");
        aggUsage.inputTokens += r.usage.inputTokens;
        aggUsage.outputTokens += r.usage.outputTokens;
        aggUsage.cachedTokens += r.usage.cachedTokens || 0;
      }
      return { parts: aligned, usage: aggUsage, hadMismatch: true };
    }
    return { parts, usage: chunkUsage, hadMismatch: false };
  }

  // shinkansen/lib/google-translate.js
  var SEP = "\n\u2063\u2063\u2063\n";
  var MAX_URL_ENCODED_CHARS = 5500;
  async function translateGoogleBatch(texts) {
    if (!texts || texts.length === 0) return { translations: [], chars: 0 };
    const totalChars = texts.reduce((s, t) => s + (t?.length || 0), 0);
    const result = new Array(texts.length).fill("");
    const groups = [];
    let cur = [];
    let curEncodedLen = 0;
    const encodedSep = encodeURIComponent(SEP).length;
    for (let i = 0; i < texts.length; i++) {
      const t = texts[i] || "";
      const eLen = encodeURIComponent(t).length + encodedSep;
      if (cur.length > 0 && curEncodedLen + eLen > MAX_URL_ENCODED_CHARS) {
        groups.push(cur);
        cur = [];
        curEncodedLen = 0;
      }
      cur.push({ idx: i, text: t });
      curEncodedLen += eLen;
    }
    if (cur.length > 0) groups.push(cur);
    for (const group of groups) {
      const joined = group.map((g) => g.text).join(SEP);
      const parts = await _fetchTranslate(joined);
      group.forEach((g, j) => {
        result[g.idx] = parts[j] ?? g.text;
      });
    }
    return { translations: result, chars: totalChars };
  }
  async function _fetchTranslate(text) {
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=zh-TW&dt=t&q=" + encodeURIComponent(text);
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Google Translate HTTP ${resp.status}`);
    const data = await resp.json();
    const full = (data[0] || []).filter(Array.isArray).map((chunk) => chunk[0] || "").join("");
    return full.split(SEP);
  }

  // shinkansen/lib/cache.js
  var KEY_PREFIX = "tc_";
  var GLOSSARY_PREFIX = "gloss_";
  var VERSION_KEY = "__cacheVersion";
  var CACHE_QUOTA_BYTES = 9.5 * 1024 * 1024;
  var EVICTION_TARGET_BYTES = 1 * 1024 * 1024;
  var lastEvictionCheckTime = 0;
  var EVICTION_CHECK_INTERVAL_MS = 3e4;
  var pendingTouches = {};
  var touchFlushTimer = null;
  var TOUCH_FLUSH_DELAY_MS = 5e3;
  function scheduleTouchFlush() {
    if (touchFlushTimer) return;
    touchFlushTimer = setTimeout(flushTouches, TOUCH_FLUSH_DELAY_MS);
  }
  function flushTouches() {
    touchFlushTimer = null;
    const updates = { ...pendingTouches };
    const keys = Object.keys(updates);
    if (!keys.length) return;
    for (const k of keys) delete pendingTouches[k];
    browser.storage.local.set(updates).catch(() => {
    });
  }
  var _hashCache = /* @__PURE__ */ new Map();
  var _HASH_CACHE_MAX = 500;
  async function hashText(text) {
    const cached = _hashCache.get(text);
    if (cached !== void 0) {
      _hashCache.delete(text);
      _hashCache.set(text, cached);
      return cached;
    }
    const buf = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest("SHA-1", buf);
    const hex = Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
    _hashCache.set(text, hex);
    if (_hashCache.size > _HASH_CACHE_MAX) {
      _hashCache.delete(_hashCache.keys().next().value);
    }
    return hex;
  }
  function estimateEntrySize(key, value) {
    const valStr = typeof value === "string" ? value : JSON.stringify(value);
    return key.length + valStr.length;
  }
  function extractValue(stored) {
    if (stored == null) return null;
    if (typeof stored === "string") return stored;
    if (typeof stored === "object" && stored.v != null) return stored.v;
    return null;
  }
  function wrapValue(translation) {
    return { v: translation, t: Date.now() };
  }
  function extractTimestamp(stored) {
    if (stored != null && typeof stored === "object" && typeof stored.t === "number") {
      return stored.t;
    }
    return 0;
  }
  async function evictOldest(targetBytes, preFetchedAll = null) {
    const all = preFetchedAll || await browser.storage.local.get(null);
    const cacheEntries = [];
    for (const [key, value] of Object.entries(all)) {
      if (key.startsWith(KEY_PREFIX) || key.startsWith(GLOSSARY_PREFIX)) {
        cacheEntries.push({
          key,
          size: estimateEntrySize(key, value),
          t: extractTimestamp(value)
        });
      }
    }
    cacheEntries.sort((a, b) => a.t - b.t);
    let freed = 0;
    const toRemove = [];
    for (const entry of cacheEntries) {
      if (freed >= targetBytes) break;
      toRemove.push(entry.key);
      freed += entry.size;
    }
    if (toRemove.length > 0) {
      await browser.storage.local.remove(toRemove);
      debugLog("info", "cache", "LRU eviction", { removed: toRemove.length, freedKB: +(freed / 1024).toFixed(1) });
    }
    return { removed: toRemove.length, freedBytes: freed };
  }
  async function getCacheUsageBytes() {
    if (typeof browser.storage.local.getBytesInUse === "function") {
      return browser.storage.local.getBytesInUse(null);
    }
    const all = await browser.storage.local.get(null);
    let bytes = 0;
    for (const [key, value] of Object.entries(all)) {
      if (key.startsWith(KEY_PREFIX) || key.startsWith(GLOSSARY_PREFIX)) {
        bytes += estimateEntrySize(key, value);
      }
    }
    return bytes;
  }
  async function safeStorageSet(updates) {
    try {
      await browser.storage.local.set(updates);
    } catch (err) {
      const msg = err?.message || "";
      if (msg.includes("QUOTA_BYTES") || msg.toLowerCase().includes("quota")) {
        debugLog("warn", "cache", "storage quota exceeded, triggering LRU eviction");
        await evictOldest(EVICTION_TARGET_BYTES);
        try {
          await browser.storage.local.set(updates);
        } catch (retryErr) {
          debugLog("error", "cache", "storage write failed after eviction", { error: retryErr.message });
        }
      } else {
        debugLog("error", "cache", "storage write failed", { error: msg });
      }
    }
  }
  async function proactiveEvictionCheck() {
    const now = Date.now();
    if (now - lastEvictionCheckTime < EVICTION_CHECK_INTERVAL_MS) return;
    lastEvictionCheckTime = now;
    try {
      const usage = await getCacheUsageBytes();
      if (usage > CACHE_QUOTA_BYTES * 0.9) {
        debugLog("info", "cache", "proactive eviction triggered", { usageMB: +(usage / 1024 / 1024).toFixed(2) });
        await evictOldest(EVICTION_TARGET_BYTES);
      }
    } catch (err) {
      debugLog("warn", "cache", "proactive eviction check failed", { error: err.message });
    }
  }
  function resolveKeySuffix(arg) {
    if (arg == null) return "";
    if (typeof arg === "string") return arg;
    if (typeof arg !== "object") return "";
    let s = arg.baseSuffix || "";
    if (arg.glossaryHash) s += "_g" + arg.glossaryHash;
    if (arg.forbiddenHash) s += "_b" + arg.forbiddenHash;
    return s;
  }
  async function hashForbiddenTerms(terms) {
    if (!Array.isArray(terms) || terms.length === 0) return "";
    const sorted = [...terms].filter((t) => t && t.forbidden).sort((a, b) => String(a.forbidden).localeCompare(String(b.forbidden)));
    if (sorted.length === 0) return "";
    const canonical = JSON.stringify(
      sorted.map((t) => ({ forbidden: String(t.forbidden), replacement: String(t.replacement || "") }))
    );
    const full = await hashText(canonical);
    return full.slice(0, 12);
  }
  async function getBatch(texts, keySuffix = "") {
    if (!texts.length) return [];
    const suffix = resolveKeySuffix(keySuffix);
    const hashes = await Promise.all(texts.map(hashText));
    const keys = hashes.map((h) => KEY_PREFIX + h + suffix);
    const stored = await browser.storage.local.get(keys);
    const results = keys.map((k) => {
      if (!(k in stored)) return null;
      const val = extractValue(stored[k]);
      if (val != null) {
        pendingTouches[k] = wrapValue(val);
      }
      return val;
    });
    if (Object.keys(pendingTouches).length > 0) {
      scheduleTouchFlush();
    }
    return results;
  }
  async function setBatch(texts, translations, keySuffix = "") {
    if (!texts.length) return;
    const suffix = resolveKeySuffix(keySuffix);
    const hashes = await Promise.all(texts.map(hashText));
    const updates = {};
    for (let i = 0; i < texts.length; i++) {
      if (translations[i]) {
        updates[KEY_PREFIX + hashes[i] + suffix] = wrapValue(translations[i]);
      }
    }
    if (Object.keys(updates).length) {
      await safeStorageSet(updates);
      proactiveEvictionCheck().catch(() => {
      });
    }
  }
  async function getGlossary(inputHash) {
    const key = GLOSSARY_PREFIX + inputHash;
    const stored = await browser.storage.local.get(key);
    if (!(key in stored)) return null;
    const entry = stored[key];
    if (Array.isArray(entry)) return entry;
    if (entry && typeof entry === "object" && Array.isArray(entry.v)) {
      browser.storage.local.set({ [key]: { v: entry.v, t: Date.now() } }).catch(() => {
      });
      return entry.v;
    }
    return null;
  }
  async function setGlossary(inputHash, glossary) {
    const key = GLOSSARY_PREFIX + inputHash;
    await safeStorageSet({ [key]: { v: glossary, t: Date.now() } });
  }
  async function clearAll() {
    const all = await browser.storage.local.get(null);
    const toRemove = Object.keys(all).filter((k) => k.startsWith(KEY_PREFIX) || k.startsWith(GLOSSARY_PREFIX));
    if (toRemove.length) {
      await browser.storage.local.remove(toRemove);
    }
    return toRemove.length;
  }
  async function stats() {
    const all = await browser.storage.local.get(null);
    const tcEntries = Object.keys(all).filter((k) => k.startsWith(KEY_PREFIX));
    const glossEntries = Object.keys(all).filter((k) => k.startsWith(GLOSSARY_PREFIX));
    let bytes = 0;
    for (const k of tcEntries) {
      bytes += estimateEntrySize(k, all[k]);
    }
    let glossaryBytes = 0;
    for (const k of glossEntries) {
      glossaryBytes += estimateEntrySize(k, all[k]);
    }
    return {
      count: tcEntries.length,
      bytes,
      glossaryCount: glossEntries.length,
      glossaryBytes
    };
  }
  async function checkVersionAndClear(currentVersion) {
    const stored = await browser.storage.local.get(VERSION_KEY);
    if (stored[VERSION_KEY] !== currentVersion) {
      const removed = await clearAll();
      await browser.storage.local.set({ [VERSION_KEY]: currentVersion });
      return { cleared: true, removed, oldVersion: stored[VERSION_KEY] };
    }
    return { cleared: false };
  }

  // shinkansen/lib/rate-limiter.js
  var WINDOW_MS = 6e4;
  var RPD_KEY_PREFIX = "rateLimit_rpd_";
  var pacificDateFmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  function getPacificDateKey(now = /* @__PURE__ */ new Date()) {
    return pacificDateFmt.format(now).replace(/-/g, "");
  }
  var RateLimiter = class {
    constructor({ rpm, tpm, rpd, safetyMargin = 0.1 }) {
      this.updateLimits({ rpm, tpm, rpd, safetyMargin });
      this.requests = [];
      this.tokens = [];
      this._tokenSum = 0;
      this.rpdDateKey = null;
      this.rpdCount = 0;
      this.rpdLoaded = false;
      this.rpdLoadingPromise = null;
      this.rpdPersistCounter = 0;
      this.rpdPersistTimer = null;
    }
    updateLimits({ rpm, tpm, rpd, safetyMargin = 0.1 }) {
      this.safetyMargin = Math.max(0, Math.min(0.5, safetyMargin));
      const factor = 1 - this.safetyMargin;
      this.rpmCap = Math.max(1, Math.floor(rpm * factor));
      this.tpmCap = Math.max(1, Math.floor(tpm * factor));
      this.rpdCap = Math.max(1, Math.floor(rpd * factor));
    }
    async loadRpdIfNeeded() {
      if (this.rpdLoaded) {
        const nowKey = getPacificDateKey();
        if (nowKey !== this.rpdDateKey) {
          this.rpdDateKey = nowKey;
          this.rpdCount = 0;
          await this.persistRpd();
        }
        return;
      }
      if (this.rpdLoadingPromise) {
        await this.rpdLoadingPromise;
        return;
      }
      this.rpdLoadingPromise = (async () => {
        const nowKey = getPacificDateKey();
        const storageKey = RPD_KEY_PREFIX + nowKey;
        const result = await browser.storage.local.get(storageKey);
        this.rpdDateKey = nowKey;
        this.rpdCount = Number(result[storageKey]) || 0;
        this.rpdLoaded = true;
        const all = await browser.storage.local.get(null);
        const staleKeys = Object.keys(all).filter(
          (k) => k.startsWith(RPD_KEY_PREFIX) && k !== storageKey
        );
        if (staleKeys.length) {
          await browser.storage.local.remove(staleKeys);
        }
      })();
      await this.rpdLoadingPromise;
      this.rpdLoadingPromise = null;
    }
    async persistRpd() {
      if (!this.rpdDateKey) return;
      const storageKey = RPD_KEY_PREFIX + this.rpdDateKey;
      await browser.storage.local.set({ [storageKey]: this.rpdCount });
    }
    /** 節流版 RPD 持久化：每 10 次或 30 秒寫入一次。 */
    scheduleRpdPersist() {
      this.rpdPersistCounter += 1;
      if (this.rpdPersistCounter >= 10) {
        this.rpdPersistCounter = 0;
        if (this.rpdPersistTimer) {
          clearTimeout(this.rpdPersistTimer);
          this.rpdPersistTimer = null;
        }
        this.persistRpd().catch(
          (err) => debugLog("warn", "rate-limit", "rpd persist failed", { error: err.message })
        );
        return;
      }
      if (!this.rpdPersistTimer) {
        this.rpdPersistTimer = setTimeout(() => {
          this.rpdPersistTimer = null;
          this.rpdPersistCounter = 0;
          this.persistRpd().catch(
            (err) => debugLog("warn", "rate-limit", "rpd persist failed (timer)", { error: err.message })
          );
        }, 3e4);
      }
    }
    /** 清除 60 秒之前的舊時間戳。 */
    pruneWindow(now) {
      const cutoff = now - WINDOW_MS;
      while (this.requests.length && this.requests[0] < cutoff) {
        this.requests.shift();
      }
      while (this.tokens.length && this.tokens[0].t < cutoff) {
        this._tokenSum -= this.tokens[0].n;
        this.tokens.shift();
      }
    }
    /** 取得目前 60 秒視窗內累積的 token 數。 */
    currentTokenSum() {
      return this._tokenSum;
    }
    /**
     * 等待並取得一個 slot。若任何維度超限則 sleep 到最近的釋放時間點再重試。
     * @param {number} estTokens 本次請求估計 input token 數
     * @param {number} priority 保留參數，目前不使用（向下相容）
     * @returns {Promise<void>}
     */
    async acquire(estTokens, priority = 1) {
      await this.loadRpdIfNeeded();
      let attempts = 0;
      while (true) {
        const waitMs = this.computeWaitMs(estTokens);
        if (waitMs <= 0) break;
        attempts++;
        if (attempts === 1) {
          debugLog("info", "rate-limit", "acquire waiting", {
            waitMs,
            estTokens,
            rpmUsed: this.requests.length,
            rpmCap: this.rpmCap,
            rpdUsed: this.rpdCount,
            rpdCap: this.rpdCap
          });
        }
        await this.sleep(waitMs);
      }
      const now = Date.now();
      this.requests.push(now);
      this.tokens.push({ t: now, n: estTokens });
      this._tokenSum += estTokens;
      this.rpdCount += 1;
      this.scheduleRpdPersist();
      const rpdExceeded = this.rpdCount > this.rpdCap;
      if (rpdExceeded) {
        debugLog("warn", "rate-limit", "RPD budget exceeded", {
          rpdUsed: this.rpdCount,
          rpdCap: this.rpdCap
        });
      }
      return { rpdExceeded };
    }
    /**
     * 判斷目前若要放 estTokens 這一次,需要等幾毫秒。
     * 回傳 0 代表可以立即放行。
     */
    computeWaitMs(estTokens) {
      const now = Date.now();
      this.pruneWindow(now);
      let wait = 0;
      if (this.requests.length + 1 > this.rpmCap) {
        const earliest = this.requests[this.requests.length - this.rpmCap];
        const releaseAt = earliest + WINDOW_MS;
        wait = Math.max(wait, releaseAt - now + 5);
      }
      const currentTok = this.currentTokenSum();
      if (currentTok + estTokens > this.tpmCap) {
        const needToRelease = currentTok + estTokens - this.tpmCap;
        let released = 0;
        for (const e of this.tokens) {
          released += e.n;
          if (released >= needToRelease) {
            const releaseAt = e.t + WINDOW_MS;
            wait = Math.max(wait, releaseAt - now + 5);
            break;
          }
        }
        if (released < needToRelease) {
          wait = Math.max(wait, WINDOW_MS + 5);
        }
      }
      return wait;
    }
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    /** 取得目前狀態快照,供 popup / debug 顯示。 */
    snapshot() {
      const now = Date.now();
      this.pruneWindow(now);
      return {
        rpmUsed: this.requests.length,
        rpmCap: this.rpmCap,
        tpmUsed: this.currentTokenSum(),
        tpmCap: this.tpmCap,
        rpdUsed: this.rpdCount,
        rpdCap: this.rpdCap,
        rpdDateKey: this.rpdDateKey,
        safetyMargin: this.safetyMargin
      };
    }
  };

  // shinkansen/lib/tier-limits.js
  var TIER_LIMITS = {
    free: {
      "gemini-3-flash-preview": { rpm: 10, tpm: 25e4, rpd: 250 },
      "gemini-3.1-flash-lite-preview": { rpm: 15, tpm: 25e4, rpd: 1e3 },
      "gemini-3.1-pro-preview": { rpm: 5, tpm: 25e4, rpd: 100 }
    },
    tier1: {
      "gemini-3-flash-preview": { rpm: 1e3, tpm: 2e6, rpd: 1e4 },
      "gemini-3.1-flash-lite-preview": { rpm: 4e3, tpm: 4e6, rpd: 15e4 },
      "gemini-3.1-pro-preview": { rpm: 225, tpm: 2e6, rpd: 250 }
    },
    tier2: {
      "gemini-3-flash-preview": { rpm: 2e3, tpm: 3e6, rpd: 1e5 },
      "gemini-3.1-flash-lite-preview": { rpm: 1e4, tpm: 1e7, rpd: 35e4 },
      "gemini-3.1-pro-preview": { rpm: 1e3, tpm: 5e6, rpd: 5e4 }
    }
  };
  var FALLBACK_LIMITS = { rpm: 60, tpm: 1e6, rpd: 1e3 };
  function getLimitsForSettings(settings) {
    const tier = settings?.tier || "tier1";
    const model = settings?.geminiConfig?.model || "gemini-3-flash-preview";
    const tierTable = TIER_LIMITS[tier];
    const base = tierTable && tierTable[model] || FALLBACK_LIMITS;
    return {
      rpm: Number(settings?.rpmOverride) || base.rpm,
      tpm: Number(settings?.tpmOverride) || base.tpm,
      rpd: Number(settings?.rpdOverride) || base.rpd,
      safetyMargin: typeof settings?.safetyMargin === "number" ? settings.safetyMargin : 0.1
    };
  }

  // shinkansen/lib/usage-db.js
  var DB_NAME = "shinkansen-usage";
  var DB_VERSION = 1;
  var STORE_NAME = "translations";
  var _dbPromise = null;
  function getDB() {
    if (_dbPromise) return _dbPromise;
    _dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
          store.createIndex("timestamp", "timestamp", { unique: false });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => {
        _dbPromise = null;
        reject(req.error);
      };
    });
    return _dbPromise;
  }
  async function logTranslation(record) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.add(record);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  async function upsertYouTubeUsage(record, mergeWindowMs = 36e5) {
    const videoId = record?.videoId;
    const model = record?.model;
    if (!videoId || !model) {
      return logTranslation(record);
    }
    const now = record.timestamp || Date.now();
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const index = store.index("timestamp");
      const range = IDBKeyRange.lowerBound(now - mergeWindowMs);
      const req = index.openCursor(range, "prev");
      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          const v = cursor.value;
          if (v.source === "youtube-subtitle" && v.videoId === videoId && v.model === model) {
            const merged = {
              ...v,
              inputTokens: (v.inputTokens || 0) + (record.inputTokens || 0),
              outputTokens: (v.outputTokens || 0) + (record.outputTokens || 0),
              cachedTokens: (v.cachedTokens || 0) + (record.cachedTokens || 0),
              billedInputTokens: (v.billedInputTokens || 0) + (record.billedInputTokens || 0),
              billedCostUSD: (v.billedCostUSD || 0) + (record.billedCostUSD || 0),
              segments: (v.segments || 0) + (record.segments || 0),
              cacheHits: (v.cacheHits || 0) + (record.cacheHits || 0),
              durationMs: (v.durationMs || 0) + (record.durationMs || 0),
              timestamp: now,
              title: record.title || v.title,
              url: record.url || v.url
            };
            const putReq = cursor.update(merged);
            putReq.onsuccess = () => resolve(v.id);
            putReq.onerror = () => reject(putReq.error);
            return;
          }
          cursor.continue();
        } else {
          const addReq = store.add(record);
          addReq.onsuccess = () => resolve(addReq.result);
          addReq.onerror = () => reject(addReq.error);
        }
      };
      req.onerror = () => reject(req.error);
    });
  }
  async function upsertGoogleUsage(record, mergeWindowMs = 18e4) {
    const url = record?.url;
    if (!url || record?.engine !== "google") {
      return logTranslation(record);
    }
    const now = record.timestamp || Date.now();
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const index = store.index("timestamp");
      const range = IDBKeyRange.lowerBound(now - mergeWindowMs);
      const req = index.openCursor(range, "prev");
      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          const v = cursor.value;
          if (v.engine === "google" && v.url === url) {
            const merged = {
              ...v,
              chars: (v.chars || 0) + (record.chars || 0),
              segments: (v.segments || 0) + (record.segments || 0),
              cacheHits: (v.cacheHits || 0) + (record.cacheHits || 0),
              durationMs: (v.durationMs || 0) + (record.durationMs || 0),
              timestamp: now,
              // title 用最新非空的（首批可能拿到 title，後續批次來自同 URL 也保留）
              title: record.title || v.title || ""
            };
            const putReq = cursor.update(merged);
            putReq.onsuccess = () => resolve(v.id);
            putReq.onerror = () => reject(putReq.error);
            return;
          }
          cursor.continue();
        } else {
          const addReq = store.add(record);
          addReq.onsuccess = () => resolve(addReq.result);
          addReq.onerror = () => reject(addReq.error);
        }
      };
      req.onerror = () => reject(req.error);
    });
  }
  async function query({ from, to } = {}) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const index = store.index("timestamp");
      const lower = from ?? 0;
      const upper = to ?? Date.now();
      const range = IDBKeyRange.bound(lower, upper);
      const results = [];
      const req = index.openCursor(range, "prev");
      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      req.onerror = () => reject(req.error);
    });
  }
  async function getStats({ from, to } = {}) {
    const records = await query({ from, to });
    const stats2 = {
      count: records.length,
      totalInputTokens: 0,
      totalOutputTokens: 0,
      totalBilledInputTokens: 0,
      totalBilledCostUSD: 0,
      totalSegments: 0,
      byModel: {}
    };
    for (const r of records) {
      stats2.totalInputTokens += r.inputTokens || 0;
      stats2.totalOutputTokens += r.outputTokens || 0;
      stats2.totalBilledInputTokens += r.billedInputTokens || 0;
      stats2.totalBilledCostUSD += r.billedCostUSD || 0;
      stats2.totalSegments += r.segments || 0;
      const m = r.model || "unknown";
      if (!stats2.byModel[m]) stats2.byModel[m] = { count: 0, billedCostUSD: 0 };
      stats2.byModel[m].count++;
      stats2.byModel[m].billedCostUSD += r.billedCostUSD || 0;
    }
    return stats2;
  }
  async function getAggregated({ from, to, groupBy = "day" } = {}) {
    const records = await query({ from, to });
    const buckets = /* @__PURE__ */ new Map();
    for (const r of records) {
      const d = new Date(r.timestamp);
      let period;
      if (groupBy === "day") {
        period = fmtDate(d);
      } else if (groupBy === "week") {
        period = fmtWeekStart(d);
      } else {
        period = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      }
      if (!buckets.has(period)) {
        buckets.set(period, { period, totalTokens: 0, billedCostUSD: 0, count: 0 });
      }
      const b = buckets.get(period);
      b.totalTokens += (r.billedInputTokens || 0) + (r.outputTokens || 0);
      b.billedCostUSD += r.billedCostUSD || 0;
      b.count++;
    }
    const result = fillGaps(buckets, from, to, groupBy);
    return result;
  }
  async function exportCSV({ from, to } = {}) {
    const records = await query({ from, to });
    records.reverse();
    const header = "\u6642\u9593,\u7DB2\u7AD9\u6A19\u984C,URL,\u6A21\u578B,\u8F38\u5165 tokens,\u8F38\u51FA tokens,\u8A08\u8CBB\u8F38\u5165 tokens,\u8CBB\u7528\uFF08USD\uFF09,\u6BB5\u843D\u6578,\u672C\u5730\u5FEB\u53D6\u547D\u4E2D,\u8017\u6642\uFF08\u79D2\uFF09";
    const rows = records.map((r) => {
      const time = new Date(r.timestamp).toLocaleString("zh-TW", { hour12: false });
      const title = csvEscape(r.title || "");
      const url = csvEscape(r.url || "");
      const model = r.model || "";
      const duration = r.durationMs ? (r.durationMs / 1e3).toFixed(1) : "";
      const cost = r.billedCostUSD ? r.billedCostUSD.toFixed(6) : "0";
      return `${time},${title},${url},${model},${r.inputTokens || 0},${r.outputTokens || 0},${r.billedInputTokens || 0},${cost},${r.segments || 0},${r.cacheHits || 0},${duration}`;
    });
    return "\uFEFF" + header + "\n" + rows.join("\n");
  }
  async function clearBefore(beforeTimestamp) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const index = store.index("timestamp");
      const range = IDBKeyRange.upperBound(beforeTimestamp);
      let count = 0;
      const req = index.openCursor(range);
      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          cursor.delete();
          count++;
          cursor.continue();
        } else {
          resolve(count);
        }
      };
      req.onerror = () => reject(req.error);
    });
  }
  async function clearAll2() {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }
  function fmtDate(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  function fmtWeekStart(d) {
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    const monday = new Date(d.getFullYear(), d.getMonth(), d.getDate() + diff);
    return fmtDate(monday);
  }
  function fillGaps(buckets, fromTs, toTs, groupBy) {
    const result = [];
    const from = new Date(fromTs || Date.now() - 30 * 864e5);
    const to = new Date(toTs || Date.now());
    if (groupBy === "day") {
      const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
      while (d <= to) {
        const key = fmtDate(d);
        result.push(buckets.get(key) || { period: key, totalTokens: 0, billedCostUSD: 0, count: 0 });
        d.setDate(d.getDate() + 1);
      }
    } else if (groupBy === "week") {
      const d = new Date(from);
      const day = d.getDay();
      const diff = (day === 0 ? -6 : 1) - day;
      d.setDate(d.getDate() + diff);
      d.setHours(0, 0, 0, 0);
      while (d <= to) {
        const key = fmtDate(d);
        result.push(buckets.get(key) || { period: key, totalTokens: 0, billedCostUSD: 0, count: 0 });
        d.setDate(d.getDate() + 7);
      }
    } else {
      const d = new Date(from.getFullYear(), from.getMonth(), 1);
      while (d <= to) {
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        result.push(buckets.get(key) || { period: key, totalTokens: 0, billedCostUSD: 0, count: 0 });
        d.setMonth(d.getMonth() + 1);
      }
    }
    return result;
  }
  function csvEscape(str) {
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  }

  // shinkansen/lib/model-pricing.js
  var MODEL_PRICING = {
    "gemini-3.1-flash-lite-preview": { inputPerMTok: 0.1, outputPerMTok: 0.3 },
    "gemini-3-flash-preview": { inputPerMTok: 0.5, outputPerMTok: 3 },
    "gemini-3.1-pro-preview": { inputPerMTok: 2, outputPerMTok: 12 }
  };
  function getPricingForModel(model, settings = null) {
    if (!model) return null;
    const override = settings?.modelPricingOverrides?.[model];
    if (override && Number.isFinite(Number(override.inputPerMTok)) && Number.isFinite(Number(override.outputPerMTok))) {
      return {
        inputPerMTok: Number(override.inputPerMTok),
        outputPerMTok: Number(override.outputPerMTok)
      };
    }
    return MODEL_PRICING[model] || null;
  }

  // shinkansen/lib/forbidden-terms.js
  function detectForbiddenTermLeaks(translations, originals, forbiddenTerms, logger) {
    if (!Array.isArray(forbiddenTerms) || forbiddenTerms.length === 0) return;
    if (!Array.isArray(translations) || translations.length === 0) return;
    if (!logger || typeof logger.warn !== "function") return;
    for (let i = 0; i < translations.length; i++) {
      const tr = translations[i] || "";
      if (!tr) continue;
      const src = Array.isArray(originals) && originals[i] || "";
      for (const t of forbiddenTerms) {
        if (!t || !t.forbidden) continue;
        if (tr.indexOf(t.forbidden) !== -1) {
          logger.warn("forbidden-term-leak", `\u9ED1\u540D\u55AE\u8A5E\u300C${t.forbidden}\u300D\u6F0F\u9032\u8B6F\u6587`, {
            forbidden: t.forbidden,
            replacement: t.replacement,
            sourceSnippet: src.slice(0, 120),
            translationSnippet: tr.slice(0, 120)
          });
        }
      }
    }
  }

  // shinkansen/lib/update-check.js
  var GITHUB_RELEASES_URL = "https://api.github.com/repos/jimmysu0309/shinkansen/releases/latest";
  var STORAGE_KEY = "updateAvailable";
  function localTodayKey() {
    const d = /* @__PURE__ */ new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  function parseVersion(v) {
    const cleaned = String(v || "").replace(/^v/, "").split("-")[0];
    const parts = cleaned.split(".").map((s) => parseInt(s, 10) || 0);
    while (parts.length < 3) parts.push(0);
    return parts.slice(0, 3);
  }
  function isWorthNotifying(latest, current) {
    const a = parseVersion(latest);
    const b = parseVersion(current);
    if (a[0] > b[0]) return true;
    if (a[0] < b[0]) return false;
    if (a[1] > b[1]) return true;
    return false;
  }
  async function isManualInstall() {
    try {
      const info = await browser.management.getSelf();
      return info.installType === "development" || info.installType === "sideload";
    } catch (err) {
      debugLog("warn", "update-check", "management.getSelf failed", { error: err.message });
      return true;
    }
  }
  async function checkForUpdate() {
    if (!await isManualInstall()) {
      return { checked: false, hasUpdate: false, error: "CWS install \u2014 skipped" };
    }
    const currentVersion = browser.runtime.getManifest().version;
    let resp;
    try {
      resp = await fetch(GITHUB_RELEASES_URL, {
        headers: { "Accept": "application/vnd.github+json" }
      });
    } catch (err) {
      debugLog("warn", "update-check", "fetch failed", { error: err.message });
      return { checked: false, hasUpdate: false, error: err.message };
    }
    if (!resp.ok) {
      debugLog("warn", "update-check", `GitHub API ${resp.status}`, { status: resp.status });
      return { checked: false, hasUpdate: false, error: `HTTP ${resp.status}` };
    }
    let json;
    try {
      json = await resp.json();
    } catch (err) {
      debugLog("warn", "update-check", "response not JSON", { error: err.message });
      return { checked: false, hasUpdate: false, error: "invalid JSON" };
    }
    const latestTag = json?.tag_name || "";
    const latestVersion = String(latestTag).replace(/^v/, "");
    const releaseUrl = json?.html_url || `https://github.com/jimmysu0309/shinkansen/releases/tag/${latestTag}`;
    if (isWorthNotifying(latestVersion, currentVersion)) {
      const payload = {
        version: latestVersion,
        releaseUrl,
        checkedAt: Date.now()
      };
      const existing = await browser.storage.local.get(STORAGE_KEY);
      const merged = {
        ...payload,
        lastNoticeShownDate: existing[STORAGE_KEY]?.lastNoticeShownDate || null
      };
      await browser.storage.local.set({ [STORAGE_KEY]: merged });
      debugLog("info", "update-check", "new version detected", {
        current: currentVersion,
        latest: latestVersion
      });
      return { checked: true, hasUpdate: true, version: latestVersion, releaseUrl };
    }
    await browser.storage.local.remove(STORAGE_KEY);
    debugLog("info", "update-check", "up-to-date", {
      current: currentVersion,
      latest: latestVersion
    });
    return { checked: true, hasUpdate: false, version: latestVersion };
  }
  async function markUpdateNoticeShown() {
    const existing = await browser.storage.local.get(STORAGE_KEY);
    const cur = existing[STORAGE_KEY];
    if (!cur) return;
    await browser.storage.local.set({
      [STORAGE_KEY]: { ...cur, lastNoticeShownDate: localTodayKey() }
    });
  }

  // shinkansen/lib/welcome-notice.js
  var STORAGE_KEY2 = "welcomeNotice";
  async function maybeWriteWelcomeNotice({ reason, previousVersion, currentVersion }) {
    if (reason !== "update") return false;
    if (!previousVersion) return false;
    if (!isWorthNotifying(currentVersion, previousVersion)) return false;
    await browser.storage.local.set({
      [STORAGE_KEY2]: {
        version: currentVersion,
        fromVersion: previousVersion,
        dismissed: false,
        lastNoticeShownDate: null
      }
    });
    return true;
  }

  // shinkansen/background.js
  debugLog("info", "system", "service worker started", { version: browser.runtime.getManifest().version });
  cleanupLegacySyncKeys();
  var limiter = null;
  async function initLimiter() {
    const settings = await getSettings();
    const limits = getLimitsForSettings(settings);
    limiter = new RateLimiter(limits);
    debugLog("info", "rate-limit", "rate limiter initialized", {
      tier: settings.tier,
      model: settings.geminiConfig.model,
      rpm: limits.rpm,
      tpm: limits.tpm,
      rpd: limits.rpd,
      safetyMargin: limits.safetyMargin
    });
  }
  initLimiter();
  browser.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;
    const relevant = ["tier", "geminiConfig", "safetyMargin", "rpmOverride", "tpmOverride", "rpdOverride"];
    if (relevant.some((k) => k in changes)) {
      getSettings().then((settings) => {
        const limits = getLimitsForSettings(settings);
        if (limiter) {
          limiter.updateLimits(limits);
          debugLog("info", "rate-limit", "rate limiter limits updated", limits);
        } else {
          limiter = new RateLimiter(limits);
        }
      });
    }
  });
  function estimateInputTokens(texts) {
    let total = 0;
    for (const t of texts) total += t?.length || 0;
    return Math.ceil(total / 3.5);
  }
  (async () => {
    const currentVersion = browser.runtime.getManifest().version;
    const result = await checkVersionAndClear(currentVersion);
    if (result.cleared) {
      debugLog("info", "cache", "cache cleared on version change", {
        oldVersion: result.oldVersion ?? "?",
        newVersion: currentVersion,
        removed: result.removed
      });
    } else {
      debugLog("info", "cache", "cache up-to-date", { version: currentVersion });
    }
  })();
  checkForUpdate().catch((err) => debugLog("warn", "update-check", "initial check failed", { error: err.message }));
  browser.runtime.onStartup?.addListener(() => {
    checkForUpdate().catch((err) => debugLog("warn", "update-check", "onStartup check failed", { error: err.message }));
  });
  browser.alarms?.create("update-check", { periodInMinutes: 60 * 24 });
  browser.alarms?.onAlarm.addListener((alarm) => {
    if (alarm.name !== "update-check") return;
    checkForUpdate().catch((err) => debugLog("warn", "update-check", "alarm check failed", { error: err.message }));
  });
  var USAGE_KEY = "usageStats";
  async function getUsageStats() {
    const { [USAGE_KEY]: s } = await browser.storage.local.get(USAGE_KEY);
    return s || {
      totalInputTokens: 0,
      totalOutputTokens: 0,
      totalCostUSD: 0,
      since: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  async function addUsage(inputTokens, outputTokens, costUSD) {
    const s = await getUsageStats();
    s.totalInputTokens += inputTokens;
    s.totalOutputTokens += outputTokens;
    s.totalCostUSD += costUSD;
    await browser.storage.local.set({ [USAGE_KEY]: s });
    return s;
  }
  async function resetUsageStats() {
    const fresh = {
      totalInputTokens: 0,
      totalOutputTokens: 0,
      totalCostUSD: 0,
      since: (/* @__PURE__ */ new Date()).toISOString()
    };
    await browser.storage.local.set({ [USAGE_KEY]: fresh });
    return fresh;
  }
  function computeCostUSD(inputTokens, outputTokens, pricing) {
    const inRate = Number(pricing?.inputPerMTok) || 0;
    const outRate = Number(pricing?.outputPerMTok) || 0;
    return inputTokens / 1e6 * inRate + outputTokens / 1e6 * outRate;
  }
  function computeBilledCostUSD(inputTokens, cachedTokens, outputTokens, pricing) {
    const uncached = Math.max(0, inputTokens - cachedTokens);
    const effectiveInput = uncached + cachedTokens * 0.25;
    return computeCostUSD(effectiveInput, outputTokens, pricing);
  }
  var BADGE_COLOR = "#cf3a2c";
  var BADGE_TEXT = "\u25CF";
  async function setTranslatedBadge(tabId) {
    if (tabId == null) return;
    try {
      await browser.action.setBadgeBackgroundColor({ color: BADGE_COLOR, tabId });
      if (browser.action.setBadgeTextColor) {
        await browser.action.setBadgeTextColor({ color: "#ffffff", tabId });
      }
      await browser.action.setBadgeText({ text: BADGE_TEXT, tabId });
    } catch (err) {
      debugLog("warn", "system", "setBadge failed", { error: err.message });
    }
  }
  async function clearTranslatedBadge(tabId) {
    if (tabId == null) return;
    try {
      await browser.action.setBadgeText({ text: "", tabId });
    } catch (err) {
      debugLog("warn", "system", "clearBadge failed", { error: err.message });
    }
  }
  browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === "loading" && changeInfo.url) {
      clearTranslatedBadge(tabId);
    }
  });
  var stickyTabs = /* @__PURE__ */ new Map();
  var _stickyHydratingPromise = null;
  var _stickyStorage = (browser.storage && browser.storage.session) ?? browser.storage.local;
  function hydrateStickyTabs() {
    if (_stickyHydratingPromise) return _stickyHydratingPromise;
    _stickyHydratingPromise = (async () => {
      try {
        const { stickyTabs: saved } = await _stickyStorage.get("stickyTabs");
        if (saved && typeof saved === "object") {
          for (const [tabId, slot] of Object.entries(saved)) {
            if (typeof slot === "number") stickyTabs.set(Number(tabId), slot);
          }
        }
      } catch (err) {
        debugLog("warn", "system", "hydrateStickyTabs failed", { error: err.message });
      }
    })();
    return _stickyHydratingPromise;
  }
  async function persistStickyTabs() {
    try {
      const obj = {};
      stickyTabs.forEach((slot, tabId) => {
        obj[tabId] = slot;
      });
      await _stickyStorage.set({ stickyTabs: obj });
    } catch (err) {
      debugLog("warn", "system", "persistStickyTabs failed", { error: err.message });
    }
  }
  browser.tabs.onCreated.addListener(async (tab) => {
    await hydrateStickyTabs();
    const openerId = tab.openerTabId;
    if (openerId == null) return;
    const slot = stickyTabs.get(openerId);
    if (slot == null) return;
    stickyTabs.set(tab.id, slot);
    await persistStickyTabs();
    debugLog("info", "system", "sticky inherited from opener", {
      newTabId: tab.id,
      openerTabId: openerId,
      slot
    });
  });
  browser.tabs.onRemoved.addListener(async (tabId) => {
    if (!stickyTabs.has(tabId)) return;
    stickyTabs.delete(tabId);
    await persistStickyTabs();
  });
  async function _handleAsrSubtitleBatch(payload, sender, cacheTag, namespace) {
    const _tReceived = Date.now();
    const s = await getSettings();
    const _settingsMs = Date.now() - _tReceived;
    debugLog("info", namespace, "asr subtitle batch received", {
      inputBytes: payload?.texts?.[0]?.length || 0,
      settingsMs: _settingsMs
    });
    const yt = s.ytSubtitle || {};
    const geminiOverrides = {
      // ASR 模式不沿用使用者自訂的 ytSubtitle.systemPrompt(那是逐條翻譯版本,規則不適用 ASR JSON 模式)
      systemInstruction: DEFAULT_ASR_SUBTITLE_SYSTEM_PROMPT,
      // ASR 合句需要一點推理,但翻譯仍應穩定;沿用 ytSubtitle.temperature
      temperature: yt.temperature ?? 0.1
    };
    if (yt.model) geminiOverrides.model = yt.model;
    const pricingOverride = yt.pricing && yt.pricing.inputPerMTok != null ? yt.pricing : null;
    return handleTranslate(
      payload,
      sender,
      geminiOverrides,
      pricingOverride,
      cacheTag,
      false,
      false
    );
  }
  var messageHandlers = {
    TRANSLATE_BATCH: {
      async: true,
      handler: (payload, sender) => {
        const overrides = payload?.modelOverride ? { model: payload.modelOverride } : {};
        return handleTranslate(payload, sender, overrides);
      }
    },
    // v1.8.0: Streaming 版翻譯,只給 content.js translateUnits 內 batch 0 用。
    // async: false——立刻回 ack,fire-and-forget streaming;結果透過 tabs.sendMessage
    // 推回 sender tab(STREAMING_FIRST_CHUNK / STREAMING_SEGMENT / STREAMING_DONE / STREAMING_ERROR / STREAMING_ABORTED)
    TRANSLATE_BATCH_STREAM: {
      async: false,
      handler: (payload, sender) => {
        const tabId = sender?.tab?.id;
        if (!tabId) return { ok: false, error: "no tab" };
        const streamId = payload?.streamId;
        if (!streamId) return { ok: false, error: "no streamId" };
        handleTranslateStream(payload, sender, streamId, tabId).catch((err) => {
          debugLog("error", "system", "TRANSLATE_BATCH_STREAM uncaught", { streamId, error: err?.message || String(err) });
          browser.tabs.sendMessage(tabId, {
            type: "STREAMING_ERROR",
            payload: { streamId, error: err?.message || String(err), atSegment: 0 }
          }).catch(() => {
          });
        });
        return { started: true };
      }
    },
    // v1.8.9: Streaming 版人工字幕 batch 0 翻譯。
    // 跟 TRANSLATE_BATCH_STREAM 共用同一條 streaming pipeline(handleTranslateStream),
    // 但帶 ytSubtitle.systemPrompt / temperature / model / pricing,cacheTag '_yt',
    // 預設不套用固定術語表 / 黑名單(跟 TRANSLATE_SUBTITLE_BATCH 對齊)。
    TRANSLATE_SUBTITLE_BATCH_STREAM: {
      async: false,
      handler: (payload, sender) => {
        const tabId = sender?.tab?.id;
        if (!tabId) return { ok: false, error: "no tab" };
        const streamId = payload?.streamId;
        if (!streamId) return { ok: false, error: "no streamId" };
        (async () => {
          const s = await getSettings();
          const yt = s.ytSubtitle || {};
          const geminiOverrides = {
            systemInstruction: yt.systemPrompt || DEFAULT_SUBTITLE_SYSTEM_PROMPT,
            temperature: yt.temperature ?? 0.1
          };
          if (yt.model) geminiOverrides.model = yt.model;
          const pricingOverride = yt.pricing && yt.pricing.inputPerMTok != null ? yt.pricing : null;
          await handleTranslateStream(payload, sender, streamId, tabId, {
            cacheTag: "_yt",
            geminiOverrides,
            pricingOverride,
            applyFixedGlossary: yt.applyFixedGlossary === true,
            applyForbiddenTerms: yt.applyForbiddenTerms === true
          });
        })().catch((err) => {
          debugLog("error", "system", "TRANSLATE_SUBTITLE_BATCH_STREAM uncaught", { streamId, error: err?.message || String(err) });
          browser.tabs.sendMessage(tabId, {
            type: "STREAMING_ERROR",
            payload: { streamId, error: err?.message || String(err), atSegment: 0 }
          }).catch(() => {
          });
        });
        return { started: true };
      }
    },
    // v1.8.0: 中斷 in-flight streaming(使用者取消翻譯時觸發)
    STREAMING_ABORT: {
      async: false,
      handler: (payload) => {
        const streamId = payload?.streamId;
        if (!streamId) return { aborted: false };
        const ac = inFlightStreams.get(streamId);
        if (ac) {
          try {
            ac.abort();
          } catch (_) {
          }
          inFlightStreams.delete(streamId);
          return { aborted: true };
        }
        return { aborted: false };
      }
    },
    // v1.2.10: 字幕翻譯專用——prompt / temperature / model 從 ytSubtitle 設定讀取（v1.2.11 改為動態載入）
    // v1.2.39: 支援 ytSubtitle.model（獨立模型）與 ytSubtitle.pricing（獨立計價）
    TRANSLATE_SUBTITLE_BATCH: {
      async: true,
      handler: async (payload, sender) => {
        const _tReceived = Date.now();
        const s = await getSettings();
        const _settingsMs = Date.now() - _tReceived;
        debugLog("info", "youtube", "subtitle batch received", {
          count: payload?.texts?.length || 0,
          settingsMs: _settingsMs
          // getSettings() 耗時（首次可能較慢）
        });
        const yt = s.ytSubtitle || {};
        const geminiOverrides = {
          systemInstruction: yt.systemPrompt || DEFAULT_SUBTITLE_SYSTEM_PROMPT,
          temperature: yt.temperature ?? 0.1
        };
        if (yt.model) geminiOverrides.model = yt.model;
        const pricingOverride = yt.pricing && yt.pricing.inputPerMTok != null ? yt.pricing : null;
        return handleTranslate(
          payload,
          sender,
          geminiOverrides,
          pricingOverride,
          "_yt",
          yt.applyFixedGlossary === true,
          yt.applyForbiddenTerms === true
        );
      }
    },
    // v1.6.20: ASR(YouTube 自動字幕)專用——LLM 自由合句 + 時間戳對齊路徑(D' 模式,
    // timestamp mode)。
    // 與 TRANSLATE_SUBTITLE_BATCH 的差異:
    //   - 走獨立 system prompt(DEFAULT_ASR_SUBTITLE_SYSTEM_PROMPT),允許 LLM 自由合句
    //   - texts 是單一元素(整視窗包成 [{s,e,t}] JSON 字串),不分批
    //   - cache key tag '_yt_asr',跟 _yt 分區避免互打
    //   - 字幕 settings 沿用 ytSubtitle(model / temperature / pricing),只覆寫 systemInstruction
    TRANSLATE_ASR_SUBTITLE_BATCH: {
      async: true,
      handler: (payload, sender) => _handleAsrSubtitleBatch(payload, sender, "_yt_asr", "youtube")
    },
    // commit 4a:Drive 影片 ASR 字幕走獨立 cache key('_drive_yt_asr')避免污染 YouTube
    // 既有 cache。LLM prompt / pricing / 設定全部沿用 ytSubtitle(D' 模式跟 YouTube 一致)。
    TRANSLATE_DRIVE_ASR_SUBTITLE_BATCH: {
      async: true,
      handler: (payload, sender) => _handleAsrSubtitleBatch(payload, sender, "_drive_yt_asr", "drive")
    },
    // Drive 影片 ASR 字幕 URL 偵測——iframe(youtube.googleapis.com/embed)的
    // content-drive-iframe.js 用 PerformanceObserver 抓到 timedtext URL 後送來。
    // 為什麼 background fetch 而不直接 iframe fetch:iframe 內 fetch 會被 PerformanceObserver
    // 重新捕捉造成 loop;且 background 跟 iframe 不同 origin,但 authpayload 自含 auth(已驗
    // credentials:'omit' 也 200),background 直接 refetch 即可。
    // 拿到 json3 後 relay 到 top frame(drive.google.com)的 content-script(commit 2 接手處理)。
    DRIVE_TIMEDTEXT_URL: {
      async: true,
      handler: async (payload, sender) => {
        const url = payload?.url;
        if (!url || !sender?.tab?.id) return { ok: false, error: "invalid payload" };
        debugLog("info", "drive", "timedtext url received from iframe", {
          tabId: sender.tab.id,
          frameId: sender.frameId,
          url: url.slice(0, 200)
        });
        try {
          const res = await fetch(url, { credentials: "omit" });
          if (!res.ok) {
            debugLog("warn", "drive", "timedtext fetch failed", { status: res.status });
            return { ok: false, error: `http ${res.status}` };
          }
          const json3 = await res.json();
          debugLog("info", "drive", "timedtext fetched", {
            eventCount: Array.isArray(json3?.events) ? json3.events.length : 0
          });
          try {
            await browser.tabs.sendMessage(
              sender.tab.id,
              { type: "DRIVE_ASR_CAPTIONS", payload: { url, json3 } },
              { frameId: 0 }
            );
          } catch (e) {
            debugLog("info", "drive", "top frame relay no listener (expected pre-commit-2)", {
              error: e?.message || String(e)
            });
          }
          return { ok: true };
        } catch (e) {
          debugLog("warn", "drive", "timedtext handler error", { error: e?.message || String(e) });
          return { ok: false, error: e?.message || String(e) };
        }
      }
    },
    // v1.4.0: Google Translate 網頁翻譯（不需 API Key，不走 rate limiter，快取 key 用 _gt 後綴）
    TRANSLATE_BATCH_GOOGLE: {
      async: true,
      handler: (payload, sender) => handleTranslateGoogle(payload, sender, "_gt")
    },
    // commit 5b:Drive 影片字幕走 Google Translate 路徑(獨立 cache key '_gt_drive' 避免跟
    // 一般網頁 GT 翻譯('_gt')互打)。input texts = raw segments 的 text array,逐段翻。
    TRANSLATE_DRIVE_BATCH_GOOGLE: {
      async: true,
      handler: (payload, sender) => handleTranslateGoogle(payload, sender, "_gt_drive")
    },
    // v1.5.7: OpenAI-compatible 自訂 Provider 翻譯（chat.completions endpoint）
    // 不走 rate limiter，cache key 加 baseUrl hash + model 分區。
    TRANSLATE_BATCH_CUSTOM: {
      async: true,
      handler: (payload, sender) => handleTranslateCustom(payload, sender, "_oc")
    },
    // v1.5.8: 字幕用自訂模型，與網頁翻譯共用 customProvider 設定但 cache key 用 '_oc_yt'
    // 命名空間（同 '_yt' 對 Gemini、'_gt_yt' 對 Google MT 的字幕分區慣例）。
    // 對 systemPrompt 走 cpOverrides 覆蓋成字幕專屬（ytSubtitle.systemPrompt）；
    // 字幕未自訂時 fallback 到主自訂模型 prompt。
    TRANSLATE_SUBTITLE_BATCH_CUSTOM: {
      async: true,
      handler: async (payload, sender) => {
        const s = await getSettings();
        const yt = s.ytSubtitle || {};
        const ytPrompt = (yt.systemPrompt || "").trim();
        const overrides = ytPrompt ? { systemPrompt: ytPrompt } : null;
        return handleTranslateCustom(
          payload,
          sender,
          "_oc_yt",
          overrides,
          yt.applyFixedGlossary === true,
          yt.applyForbiddenTerms === true
        );
      }
    },
    // v1.6.1: 使用者點 toast 內「下載」連結或「×」時，標記今日已顯示更新提示（每日節流）
    UPDATE_NOTICE_DISMISSED: {
      async: true,
      handler: () => markUpdateNoticeShown()
    },
    // v1.6.5: 「知道了」按鈕（popup banner）標記永久 dismissed=true
    WELCOME_NOTICE_DISMISSED: {
      async: true,
      handler: async () => {
        const { welcomeNotice } = await browser.storage.local.get("welcomeNotice");
        if (!welcomeNotice) return;
        await browser.storage.local.set({
          welcomeNotice: { ...welcomeNotice, dismissed: true }
        });
      }
    },
    // v1.6.5: toast 顯示過 welcome notice 後標記今天日期（每日節流，避免每次翻譯都嘮叨）
    WELCOME_NOTICE_TOAST_SHOWN: {
      async: true,
      handler: async () => {
        const { welcomeNotice } = await browser.storage.local.get("welcomeNotice");
        if (!welcomeNotice) return;
        await browser.storage.local.set({
          welcomeNotice: { ...welcomeNotice, lastNoticeShownDate: localTodayKey() }
        });
      }
    },
    // v1.5.7: API Key 測試 — 設定頁「測試」按鈕觸發。
    // Gemini 走 GET models/<model>?key=<key> 不耗 token；
    // OpenAI-compat 走 POST /chat/completions max_tokens=1 ping，耗 ~1 token。
    TEST_GEMINI_KEY: {
      async: true,
      handler: (payload) => testGeminiKey(payload)
    },
    TEST_CUSTOM_PROVIDER: {
      async: true,
      handler: (payload) => testCustomProvider(payload)
    },
    // v1.4.0: Google Translate 字幕翻譯（快取 key 用 _gt_yt 後綴）
    TRANSLATE_SUBTITLE_BATCH_GOOGLE: {
      async: true,
      handler: (payload, sender) => handleTranslateGoogle(payload, sender, "_gt_yt")
    },
    EXTRACT_GLOSSARY: {
      async: true,
      handler: (payload, sender) => handleExtractGlossary(payload, sender)
    },
    CLEAR_CACHE: {
      async: true,
      handler: () => clearAll().then((removed) => ({ removed }))
    },
    CACHE_STATS: {
      async: true,
      handler: () => stats()
    },
    USAGE_STATS: {
      async: true,
      handler: () => getUsageStats()
    },
    RESET_USAGE: {
      async: true,
      handler: () => resetUsageStats()
    },
    SET_BADGE_TRANSLATED: {
      async: true,
      handler: (_, sender) => setTranslatedBadge(sender?.tab?.id)
    },
    CLEAR_BADGE: {
      async: true,
      handler: (_, sender) => clearTranslatedBadge(sender?.tab?.id)
    },
    // v1.4.11 跨 tab sticky 翻譯（v1.4.12 起 value = preset slot number）
    STICKY_QUERY: {
      async: true,
      handler: async (_, sender) => {
        await hydrateStickyTabs();
        const tabId = sender?.tab?.id;
        if (tabId == null) return { ok: true, shouldTranslate: false };
        const slot = stickyTabs.get(tabId);
        return { ok: true, shouldTranslate: slot != null, slot: slot ?? null };
      }
    },
    STICKY_SET: {
      async: true,
      handler: async (payload, sender) => {
        await hydrateStickyTabs();
        const tabId = sender?.tab?.id;
        if (tabId == null) return { ok: false, error: "no tab id" };
        const slot = Number(payload?.slot);
        if (!Number.isInteger(slot) || slot < 1) return { ok: false, error: "invalid slot" };
        stickyTabs.set(tabId, slot);
        await persistStickyTabs();
        return { ok: true };
      }
    },
    STICKY_CLEAR: {
      async: true,
      handler: async (_, sender) => {
        await hydrateStickyTabs();
        const tabId = sender?.tab?.id;
        if (tabId == null) return { ok: false };
        stickyTabs.delete(tabId);
        await persistStickyTabs();
        return { ok: true };
      }
    },
    LOG: {
      async: false,
      handler: (payload, sender) => {
        const { level, category, message: msg, data } = payload || {};
        const enrichedData = { ...data, _tab: sender?.tab?.url || sender?.url };
        debugLog(level || "info", category || "system", msg || "", enrichedData);
      }
    },
    GET_LOGS: {
      async: false,
      handler: (payload) => getLogs(payload?.afterSeq || 0)
    },
    CLEAR_LOGS: {
      async: false,
      handler: () => {
        clearLogs();
      }
    },
    // v1.2.52: 持久化 log（跨 service worker 重啟）
    GET_PERSISTED_LOGS: {
      async: true,
      handler: async () => {
        const logs = await getPersistedLogs();
        return { logs, count: logs.length };
      }
    },
    CLEAR_PERSISTED_LOGS: {
      async: true,
      handler: async () => {
        await clearPersistedLogs();
        return { ok: true };
      }
    },
    // v1.0.7: Google Docs — 在新分頁開啟 mobilebasic 版本並自動觸發翻譯
    OPEN_GDOC_MOBILE: {
      async: true,
      handler: async (payload) => {
        const url = payload?.url;
        if (!url) throw new Error("missing url");
        const tab = await browser.tabs.create({ url });
        debugLog("info", "system", "opened Google Docs mobilebasic tab", { url, tabId: tab.id });
        return new Promise((resolve) => {
          const onUpdated = (tabId, changeInfo) => {
            if (tabId === tab.id && changeInfo.status === "complete") {
              browser.tabs.onUpdated.removeListener(onUpdated);
              setTimeout(() => {
                browser.tabs.sendMessage(tab.id, { type: "TOGGLE_TRANSLATE" }).catch(() => {
                });
              }, 500);
              resolve({ tabId: tab.id });
            }
          };
          browser.tabs.onUpdated.addListener(onUpdated);
          setTimeout(() => {
            browser.tabs.onUpdated.removeListener(onUpdated);
            resolve({ tabId: tab.id, timeout: true });
          }, 3e4);
        });
      }
    },
    CLEAR_RPD: {
      async: true,
      handler: async () => {
        const all = await browser.storage.local.get(null);
        const rpdKeys = Object.keys(all).filter((k) => k.startsWith("rateLimit_rpd_"));
        if (rpdKeys.length) await browser.storage.local.remove(rpdKeys);
        if (limiter) {
          limiter.rpdCount = 0;
          limiter.rpdLoaded = false;
          limiter.rpdLoadingPromise = null;
        }
        debugLog("info", "rate-limit", "RPD cleared via debug bridge", { removedKeys: rpdKeys });
        return { removedKeys: rpdKeys };
      }
    },
    LOG_USAGE: {
      async: true,
      handler: async (payload) => {
        const settings = await getSettingsCached();
        let resolvedModel;
        if (payload.engine === "openai-compat") {
          resolvedModel = settings.customProvider?.model || "unknown";
        } else {
          resolvedModel = payload.model || settings.geminiConfig?.model || "unknown";
        }
        const record = {
          ...payload,
          engine: payload.engine || "gemini",
          model: resolvedModel
        };
        if (record.source === "youtube-subtitle" && record.videoId) {
          await upsertYouTubeUsage(record);
        } else {
          await logTranslation(record);
        }
      }
    },
    QUERY_USAGE: {
      async: true,
      handler: async (payload) => ({ records: await query(payload || {}) })
    },
    QUERY_USAGE_STATS: {
      async: true,
      handler: async (payload) => ({ stats: await getStats(payload || {}) })
    },
    QUERY_USAGE_CHART: {
      async: true,
      handler: async (payload) => ({ data: await getAggregated(payload || {}) })
    },
    EXPORT_USAGE_CSV: {
      async: true,
      handler: async (payload) => ({ csv: await exportCSV(payload || {}) })
    },
    CLEAR_USAGE: {
      async: true,
      handler: (payload) => {
        return payload?.beforeTimestamp ? clearBefore(payload.beforeTimestamp) : clearAll2();
      }
    }
    // v1.3.12: FETCH_YT_CAPTIONS 已移除。
    // YouTube 字幕資料由 content-youtube-main.js 的 XHR monkey-patch 攔截取得，
    // 不再透過 background 主動 fetch（YouTube timedtext URL 即使 same-origin 也因 exp=xpv 需要 POT）。
  };
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const type = message?.type;
    const entry = messageHandlers[type];
    if (!entry) return;
    if (entry.async) {
      entry.handler(message.payload, sender).then((result) => sendResponse({ ok: true, ...result && typeof result === "object" ? result : {} })).catch((err) => {
        debugLog("error", "system", `${type} failed`, { error: err?.message || String(err) });
        sendResponse({ ok: false, error: err?.message || String(err) });
      });
      return true;
    } else {
      const result = entry.handler(message.payload, sender);
      sendResponse({ ok: true, ...result && typeof result === "object" ? result : {} });
      return false;
    }
  });
  var inFlightStreams = /* @__PURE__ */ new Map();
  var _streamKeepAliveTimer = null;
  function _startStreamKeepAlive() {
    if (_streamKeepAliveTimer) return;
    _streamKeepAliveTimer = setInterval(() => {
      browser.runtime.getPlatformInfo().catch(() => {
      });
    }, 2e4);
  }
  function _stopStreamKeepAliveIfIdle() {
    if (inFlightStreams.size === 0 && _streamKeepAliveTimer) {
      clearInterval(_streamKeepAliveTimer);
      _streamKeepAliveTimer = null;
    }
  }
  async function handleTranslateStream(payload, sender, streamId, tabId, opts = {}) {
    const {
      cacheTag = "",
      geminiOverrides = {},
      pricingOverride = null,
      applyFixedGlossary = true,
      applyForbiddenTerms = true
    } = opts;
    const settings = await getSettings();
    if (!settings.apiKey) {
      browser.tabs.sendMessage(tabId, {
        type: "STREAMING_ERROR",
        payload: { streamId, error: "\u5C1A\u672A\u8A2D\u5B9A Gemini API Key,\u8ACB\u81F3\u8A2D\u5B9A\u9801\u586B\u5165\u3002", atSegment: 0 }
      }).catch(() => {
      });
      return;
    }
    const texts = payload?.texts || [];
    if (!texts.length) {
      browser.tabs.sendMessage(tabId, {
        type: "STREAMING_DONE",
        payload: { streamId, usage: { inputTokens: 0, outputTokens: 0, cachedTokens: 0, billedInputTokens: 0, billedCostUSD: 0 }, totalSegments: 0, hadMismatch: false, finishReason: "STOP" }
      }).catch(() => {
      });
      return;
    }
    const overrides = { ...geminiOverrides };
    if (payload?.modelOverride) overrides.model = payload.modelOverride;
    const effectiveSettings = Object.keys(overrides).length > 0 ? { ...settings, geminiConfig: { ...settings.geminiConfig, ...overrides } } : settings;
    let effectivePricing = pricingOverride;
    if (!effectivePricing && overrides.model) effectivePricing = getPricingForModel(overrides.model, settings);
    if (!effectivePricing) effectivePricing = settings.pricing;
    let fixedGlossaryEntries = null;
    const fg = applyFixedGlossary ? settings.fixedGlossary : null;
    if (fg) {
      const globalEntries = Array.isArray(fg.global) ? fg.global.filter((e) => e.source && e.target) : [];
      let domainEntries = [];
      if (fg.byDomain && sender?.tab?.url) {
        try {
          const hostname = new URL(sender.tab.url).hostname;
          domainEntries = Array.isArray(fg.byDomain[hostname]) ? fg.byDomain[hostname].filter((e) => e.source && e.target) : [];
        } catch {
        }
      }
      if (globalEntries.length || domainEntries.length) {
        fixedGlossaryEntries = [...globalEntries, ...domainEntries];
      }
    }
    const forbiddenTermsList = applyForbiddenTerms && Array.isArray(settings.forbiddenTerms) ? settings.forbiddenTerms : [];
    let cacheKeySuffix = cacheTag;
    const glossary = payload?.glossary || null;
    const allGlossaryForHash = [
      ...(glossary || []).map((e) => `${e.source}:${e.target}`),
      ...(fixedGlossaryEntries || []).map((e) => `F:${e.source}:${e.target}`)
    ];
    if (allGlossaryForHash.length > 0) {
      const fullHash = await hashText(allGlossaryForHash.join("|"));
      cacheKeySuffix = "_g" + fullHash.slice(0, 12);
    }
    const forbiddenHash = await hashForbiddenTerms(forbiddenTermsList);
    if (forbiddenHash) cacheKeySuffix += "_b" + forbiddenHash;
    const modelStr = effectiveSettings.geminiConfig?.model || "unknown";
    cacheKeySuffix += "_m" + modelStr.replace(/[^a-z0-9.\-]/gi, "_");
    const cached = await getBatch(texts, cacheKeySuffix);
    const allHit = cached.every((tr) => tr != null);
    const cacheHits = cached.filter((tr) => tr != null).length;
    debugLog("info", "cache", "streaming batch cache lookup", {
      streamId,
      total: texts.length,
      hits: cacheHits,
      misses: texts.length - cacheHits,
      allHit
    });
    if (allHit) {
      inFlightStreams.delete(streamId);
      _stopStreamKeepAliveIfIdle();
      browser.tabs.sendMessage(tabId, { type: "STREAMING_FIRST_CHUNK", payload: { streamId } }).catch(() => {
      });
      for (let i = 0; i < cached.length; i++) {
        browser.tabs.sendMessage(tabId, {
          type: "STREAMING_SEGMENT",
          payload: { streamId, segmentIdx: i, translation: cached[i] }
        }).catch(() => {
        });
      }
      browser.tabs.sendMessage(tabId, {
        type: "STREAMING_DONE",
        payload: {
          streamId,
          usage: { inputTokens: 0, outputTokens: 0, cachedTokens: 0, billedInputTokens: 0, billedCostUSD: 0, cacheHits: texts.length },
          totalSegments: cached.length,
          hadMismatch: false,
          finishReason: "STOP"
        }
      }).catch(() => {
      });
      return;
    }
    const ac = new AbortController();
    inFlightStreams.set(streamId, ac);
    _startStreamKeepAlive();
    let firstChunkSent = false;
    const onFirstChunk = () => {
      if (firstChunkSent) return;
      firstChunkSent = true;
      browser.tabs.sendMessage(tabId, {
        type: "STREAMING_FIRST_CHUNK",
        payload: { streamId }
      }).catch(() => {
      });
    };
    const onSegment = (idx, translation, _hadMismatch) => {
      browser.tabs.sendMessage(tabId, {
        type: "STREAMING_SEGMENT",
        payload: { streamId, segmentIdx: idx, translation }
      }).catch(() => {
      });
    };
    try {
      const result = await translateBatchStream(
        texts,
        effectiveSettings,
        glossary,
        fixedGlossaryEntries,
        forbiddenTermsList.length > 0 ? forbiddenTermsList : null,
        { onFirstChunk, onSegment },
        ac.signal
      );
      if (result.translations && result.translations.length > 0) {
        const writableTexts = [];
        const writableTranslations = [];
        for (let i = 0; i < texts.length && i < result.translations.length; i++) {
          if (result.translations[i]) {
            writableTexts.push(texts[i]);
            writableTranslations.push(result.translations[i]);
          }
        }
        if (writableTexts.length > 0) {
          await setBatch(writableTexts, writableTranslations, cacheKeySuffix);
          debugLog("info", "cache", "streaming batch cache write", {
            streamId,
            written: writableTexts.length
          });
        }
      }
      const billedInputTokens = Math.max(
        0,
        Math.round(result.usage.inputTokens - (result.usage.cachedTokens || 0) * 0.75)
      );
      const billedCostUSD = computeBilledCostUSD(
        result.usage.inputTokens,
        result.usage.cachedTokens || 0,
        result.usage.outputTokens,
        effectivePricing
      );
      await addUsage(billedInputTokens, result.usage.outputTokens, billedCostUSD);
      browser.tabs.sendMessage(tabId, {
        type: "STREAMING_DONE",
        payload: {
          streamId,
          usage: {
            ...result.usage,
            billedInputTokens,
            billedCostUSD
          },
          totalSegments: result.translations.length,
          hadMismatch: result.hadMismatch,
          finishReason: result.finishReason
        }
      }).catch(() => {
      });
    } catch (err) {
      if (ac.signal.aborted || /aborted/i.test(err?.message || "")) {
        browser.tabs.sendMessage(tabId, {
          type: "STREAMING_ABORTED",
          payload: { streamId }
        }).catch(() => {
        });
      } else {
        debugLog("error", "api", "streaming translateBatch failed", { streamId, error: err?.message || String(err) });
        browser.tabs.sendMessage(tabId, {
          type: "STREAMING_ERROR",
          payload: { streamId, error: err?.message || String(err), atSegment: 0 }
        }).catch(() => {
        });
      }
    } finally {
      inFlightStreams.delete(streamId);
      _stopStreamKeepAliveIfIdle();
    }
  }
  async function handleTranslate(payload, sender, geminiOverrides = {}, pricingOverride = null, cacheTag = "", applyFixedGlossary = true, applyForbiddenTerms = true) {
    const settings = await getSettings();
    if (!settings.apiKey) {
      throw new Error("\u5C1A\u672A\u8A2D\u5B9A Gemini API Key\uFF0C\u8ACB\u81F3\u8A2D\u5B9A\u9801\u586B\u5165\u3002");
    }
    const texts = payload.texts;
    const glossary = payload.glossary || null;
    const effectiveSettings = Object.keys(geminiOverrides).length > 0 ? { ...settings, geminiConfig: { ...settings.geminiConfig, ...geminiOverrides } } : settings;
    let effectivePricing = pricingOverride;
    if (!effectivePricing && geminiOverrides.model) {
      effectivePricing = getPricingForModel(geminiOverrides.model, settings);
    }
    if (!effectivePricing) {
      effectivePricing = settings.pricing;
    }
    let fixedGlossaryEntries = null;
    const fg = applyFixedGlossary ? settings.fixedGlossary : null;
    if (fg) {
      const globalEntries = Array.isArray(fg.global) ? fg.global.filter((e) => e.source && e.target) : [];
      let domainEntries = [];
      if (fg.byDomain && sender?.tab?.url) {
        try {
          const hostname = new URL(sender.tab.url).hostname;
          domainEntries = Array.isArray(fg.byDomain[hostname]) ? fg.byDomain[hostname].filter((e) => e.source && e.target) : [];
        } catch {
        }
      }
      if (globalEntries.length > 0 || domainEntries.length > 0) {
        const merged = /* @__PURE__ */ new Map();
        for (const e of globalEntries) merged.set(e.source, e.target);
        for (const e of domainEntries) merged.set(e.source, e.target);
        fixedGlossaryEntries = [...merged.entries()].map(([source, target]) => ({ source, target }));
      }
    }
    const forbiddenTermsList = applyForbiddenTerms && Array.isArray(settings.forbiddenTerms) ? settings.forbiddenTerms : [];
    let glossaryKeySuffix = cacheTag;
    const allGlossaryForHash = [
      ...(glossary || []).map((e) => `${e.source}:${e.target}`),
      ...(fixedGlossaryEntries || []).map((e) => `F:${e.source}:${e.target}`)
    ];
    if (allGlossaryForHash.length > 0) {
      const fullHash = await hashText(allGlossaryForHash.join("|"));
      glossaryKeySuffix = "_g" + fullHash.slice(0, 12);
    }
    const forbiddenHash = await hashForbiddenTerms(forbiddenTermsList);
    if (forbiddenHash) {
      glossaryKeySuffix += "_b" + forbiddenHash;
    }
    const modelStr = effectiveSettings.geminiConfig?.model || "unknown";
    glossaryKeySuffix += "_m" + modelStr.replace(/[^a-z0-9.\-]/gi, "_");
    const cached = await getBatch(texts, glossaryKeySuffix);
    const missingIdxs = [];
    const missingTexts = [];
    cached.forEach((tr, i) => {
      if (tr == null) {
        missingIdxs.push(i);
        missingTexts.push(texts[i]);
      }
    });
    const cacheHits = texts.length - missingTexts.length;
    debugLog("info", "cache", "batch cache lookup", {
      total: texts.length,
      hits: cacheHits,
      misses: missingTexts.length
    });
    let fresh = [];
    let batchUsage = { inputTokens: 0, outputTokens: 0, cachedTokens: 0 };
    let batchCostUSD = 0;
    let billedInputTokens = 0;
    let billedCostUSD = 0;
    let acquireResult = null;
    let batchHadMismatch = false;
    if (missingTexts.length) {
      if (!limiter) await initLimiter();
      const estTokens = estimateInputTokens(missingTexts);
      debugLog("info", "rate-limit", "acquire start", { estTokens, limiterExists: !!limiter });
      const tAcq0 = Date.now();
      acquireResult = await limiter.acquire(
        estTokens,
        /* priority */
        1
      );
      const acquireMs = Date.now() - tAcq0;
      if (acquireMs > 50) {
        debugLog("info", "rate-limit", "rate limiter waited", { waitMs: acquireMs, estTokens });
      }
      const t0 = Date.now();
      const totalChars = missingTexts.reduce((s, t) => s + (t?.length || 0), 0);
      debugLog("info", "api", "translateBatch start", { texts: missingTexts.length, chars: totalChars });
      const res = await translateBatch(missingTexts, effectiveSettings, glossary, fixedGlossaryEntries, forbiddenTermsList);
      fresh = res.translations;
      batchUsage = res.usage;
      batchHadMismatch = res.hadMismatch || false;
      detectForbiddenTermLeaks(fresh, missingTexts, forbiddenTermsList, {
        warn: (category, message, data) => debugLog("warn", category, message, data)
      });
      batchCostUSD = computeCostUSD(batchUsage.inputTokens, batchUsage.outputTokens, effectivePricing);
      const batchMs = Date.now() - t0;
      debugLog("info", "api", "translateBatch done", {
        count: missingTexts.length,
        chars: totalChars,
        elapsed: batchMs,
        inputTokens: batchUsage.inputTokens,
        outputTokens: batchUsage.outputTokens,
        cachedTokens: batchUsage.cachedTokens || 0,
        costUSD: batchCostUSD,
        tabUrl: sender?.tab?.url
      });
      await setBatch(missingTexts, fresh, glossaryKeySuffix);
      billedInputTokens = Math.max(
        0,
        Math.round(batchUsage.inputTokens - (batchUsage.cachedTokens || 0) * 0.75)
      );
      billedCostUSD = computeBilledCostUSD(
        batchUsage.inputTokens,
        batchUsage.cachedTokens || 0,
        batchUsage.outputTokens,
        effectivePricing
      );
      await addUsage(billedInputTokens, batchUsage.outputTokens, billedCostUSD);
    }
    const result = cached.slice();
    missingIdxs.forEach((idx, k) => {
      result[idx] = fresh[k];
    });
    return {
      result,
      usage: {
        // 原始（未套 implicit cache 折扣）數字，保留給 content 端算 hit% / saved%
        inputTokens: batchUsage.inputTokens,
        outputTokens: batchUsage.outputTokens,
        // Gemini implicit context cache 命中的輸入 token 數（v0.46 新增）。
        // 注意這跟下面的 `cacheHits`(本地 tc_<sha1> 翻譯快取命中段數) 是兩回事。
        cachedTokens: batchUsage.cachedTokens || 0,
        costUSD: batchCostUSD,
        // v0.48: 套 implicit cache 折扣後的「實付」數字。toast 與 popup 都顯示這組
        billedInputTokens,
        billedCostUSD,
        cacheHits
      },
      // v0.90: RPD 軟性預算警告（不阻擋翻譯，只通知 content 端顯示提示）
      rpdExceeded: acquireResult?.rpdExceeded || false,
      // v0.94: 本批翻譯是否觸發了 segment mismatch fallback
      hadMismatch: batchHadMismatch
    };
  }
  async function testGeminiKey(payload) {
    const apiKey = (payload?.apiKey || "").trim();
    const model = (payload?.model || "gemini-3-flash-preview").trim();
    if (!apiKey) return { ok: false, message: "API Key \u70BA\u7A7A\uFF0C\u8ACB\u5148\u586B\u5165\u518D\u6E2C\u8A66\u3002" };
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}?key=${encodeURIComponent(apiKey)}`;
    try {
      const resp = await fetch(url, { method: "GET" });
      if (resp.ok) {
        const j = await resp.json().catch(() => ({}));
        return { ok: true, status: resp.status, message: `\u9023\u7DDA\u6210\u529F\uFF08model: ${j?.name || model}\uFF09` };
      }
      let errMsg = `HTTP ${resp.status}`;
      try {
        const j = await resp.json();
        errMsg = j?.error?.message || errMsg;
      } catch {
      }
      return { ok: false, status: resp.status, message: errMsg };
    } catch (err) {
      return { ok: false, message: "\u7DB2\u8DEF\u932F\u8AA4\uFF1A" + (err?.message || String(err)) };
    }
  }
  async function testCustomProvider(payload) {
    const baseUrl = (payload?.baseUrl || "").trim().replace(/\/+$/, "");
    const model = (payload?.model || "").trim();
    const apiKey = (payload?.apiKey || "").trim();
    if (!baseUrl) return { ok: false, message: "Base URL \u70BA\u7A7A\u3002" };
    if (!model) return { ok: false, message: "\u6A21\u578B ID \u70BA\u7A7A\u3002" };
    const url = /\/chat\/completions$/.test(baseUrl) ? baseUrl : baseUrl + "/chat/completions";
    try {
      const headers = { "Content-Type": "application/json" };
      if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
      const resp = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: "ping" }],
          max_tokens: 1,
          stream: false
        })
      });
      if (resp.ok) {
        const j = await resp.json().catch(() => ({}));
        const used = j?.usage?.total_tokens || j?.usage?.prompt_tokens || 0;
        return { ok: true, status: resp.status, message: `\u9023\u7DDA\u6210\u529F\uFF08${model}\uFF0C\u672C\u6B21\u7528\u91CF\u7D04 ${used} tokens\uFF09` };
      }
      let errMsg = `HTTP ${resp.status}`;
      try {
        const j = await resp.json();
        errMsg = j?.error?.message || j?.message || errMsg;
      } catch {
      }
      return { ok: false, status: resp.status, message: errMsg };
    } catch (err) {
      return { ok: false, message: "\u7DB2\u8DEF\u932F\u8AA4\uFF1A" + (err?.message || String(err)) };
    }
  }
  async function handleTranslateCustom(payload, sender, cacheTag = "_oc", cpOverrides = null, applyFixedGlossary = true, applyForbiddenTerms = true) {
    const settings = await getSettings();
    const cp = { ...settings.customProvider || {}, ...cpOverrides || {} };
    if (!cp.baseUrl) throw new Error("\u5C1A\u672A\u8A2D\u5B9A\u81EA\u8A02 Provider \u7684 Base URL\u3002");
    if (!cp.model) throw new Error("\u5C1A\u672A\u8A2D\u5B9A\u81EA\u8A02 Provider \u7684\u6A21\u578B ID\u3002");
    const texts = payload.texts;
    const glossary = payload.glossary || null;
    let fixedGlossaryEntries = null;
    const fg = applyFixedGlossary ? settings.fixedGlossary : null;
    if (fg) {
      const globalEntries = Array.isArray(fg.global) ? fg.global.filter((e) => e.source && e.target) : [];
      let domainEntries = [];
      if (fg.byDomain && sender?.tab?.url) {
        try {
          const hostname = new URL(sender.tab.url).hostname;
          domainEntries = Array.isArray(fg.byDomain[hostname]) ? fg.byDomain[hostname].filter((e) => e.source && e.target) : [];
        } catch {
        }
      }
      if (globalEntries.length > 0 || domainEntries.length > 0) {
        const merged = /* @__PURE__ */ new Map();
        for (const e of globalEntries) merged.set(e.source, e.target);
        for (const e of domainEntries) merged.set(e.source, e.target);
        fixedGlossaryEntries = [...merged.entries()].map(([source, target]) => ({ source, target }));
      }
    }
    const forbiddenTermsList = applyForbiddenTerms && Array.isArray(settings.forbiddenTerms) ? settings.forbiddenTerms : [];
    let suffix = cacheTag;
    const allGlossaryForHash = [
      ...(glossary || []).map((e) => `${e.source}:${e.target}`),
      ...(fixedGlossaryEntries || []).map((e) => `F:${e.source}:${e.target}`)
    ];
    if (allGlossaryForHash.length > 0) {
      const fullHash = await hashText(allGlossaryForHash.join("|"));
      suffix += "_g" + fullHash.slice(0, 12);
    }
    const forbiddenHash = await hashForbiddenTerms(forbiddenTermsList);
    if (forbiddenHash) {
      suffix += "_b" + forbiddenHash;
    }
    const baseUrlHash = (await hashText(cp.baseUrl)).slice(0, 6);
    const safeModel = String(cp.model).replace(/[^a-z0-9.\-]/gi, "_");
    suffix += `_m${baseUrlHash}_${safeModel}`;
    const cached = await getBatch(texts, suffix);
    const missingIdxs = [];
    const missingTexts = [];
    cached.forEach((tr, i) => {
      if (tr == null) {
        missingIdxs.push(i);
        missingTexts.push(texts[i]);
      }
    });
    const cacheHits = texts.length - missingTexts.length;
    debugLog("info", "cache", "openai-compat batch cache lookup", {
      total: texts.length,
      hits: cacheHits,
      misses: missingTexts.length
    });
    let fresh = [];
    let batchUsage = { inputTokens: 0, outputTokens: 0, cachedTokens: 0 };
    let batchCostUSD = 0;
    let batchHadMismatch = false;
    if (missingTexts.length) {
      const t0 = Date.now();
      const totalChars = missingTexts.reduce((s, t) => s + (t?.length || 0), 0);
      debugLog("info", "api", "openai-compat translateBatch start", {
        texts: missingTexts.length,
        chars: totalChars,
        baseUrl: cp.baseUrl,
        model: cp.model
      });
      const res = await translateBatch2(missingTexts, settings, glossary, fixedGlossaryEntries, forbiddenTermsList);
      fresh = res.translations;
      batchUsage = res.usage;
      batchHadMismatch = res.hadMismatch || false;
      batchCostUSD = computeCostUSD(batchUsage.inputTokens, batchUsage.outputTokens, {
        inputPerMTok: cp.inputPerMTok || 0,
        outputPerMTok: cp.outputPerMTok || 0
      });
      const batchMs = Date.now() - t0;
      debugLog("info", "api", "openai-compat translateBatch done", {
        count: missingTexts.length,
        chars: totalChars,
        elapsed: batchMs,
        inputTokens: batchUsage.inputTokens,
        outputTokens: batchUsage.outputTokens,
        cachedTokens: batchUsage.cachedTokens || 0,
        costUSD: batchCostUSD
      });
      detectForbiddenTermLeaks(fresh, missingTexts, forbiddenTermsList, {
        warn: (category, message, data) => debugLog("warn", category, message, data)
      });
      await setBatch(missingTexts, fresh, suffix);
      const billedInput = Math.max(
        0,
        Math.round(batchUsage.inputTokens - (batchUsage.cachedTokens || 0) * 0.75)
      );
      const billedCost = computeBilledCostUSD(
        batchUsage.inputTokens,
        batchUsage.cachedTokens || 0,
        batchUsage.outputTokens,
        { inputPerMTok: cp.inputPerMTok || 0, outputPerMTok: cp.outputPerMTok || 0 }
      );
      await addUsage(billedInput, batchUsage.outputTokens, billedCost);
    }
    const result = cached.slice();
    missingIdxs.forEach((idx, k) => {
      result[idx] = fresh[k];
    });
    return {
      result,
      usage: {
        inputTokens: batchUsage.inputTokens,
        outputTokens: batchUsage.outputTokens,
        cachedTokens: batchUsage.cachedTokens || 0,
        costUSD: batchCostUSD,
        billedInputTokens: Math.max(
          0,
          Math.round(batchUsage.inputTokens - (batchUsage.cachedTokens || 0) * 0.75)
        ),
        billedCostUSD: computeBilledCostUSD(
          batchUsage.inputTokens,
          batchUsage.cachedTokens || 0,
          batchUsage.outputTokens,
          { inputPerMTok: cp.inputPerMTok || 0, outputPerMTok: cp.outputPerMTok || 0 }
        ),
        cacheHits
      },
      rpdExceeded: false,
      // 不走 rate limiter
      hadMismatch: batchHadMismatch
    };
  }
  async function handleTranslateGoogle(payload, sender, cacheSuffix) {
    const texts = payload?.texts;
    if (!Array.isArray(texts) || texts.length === 0) {
      return { result: [], usage: { engine: "google", chars: 0 } };
    }
    const cached = await getBatch(texts, cacheSuffix);
    const missingIdxs = [];
    const missingTexts = [];
    cached.forEach((tr, i) => {
      if (tr == null) {
        missingIdxs.push(i);
        missingTexts.push(texts[i]);
      }
    });
    const cacheHits = texts.length - missingTexts.length;
    debugLog("info", "cache", "google batch cache lookup", {
      total: texts.length,
      hits: cacheHits,
      misses: missingTexts.length
    });
    let fresh = [];
    let totalChars = 0;
    if (missingTexts.length > 0) {
      const t0 = Date.now();
      debugLog("info", "api", "google translateBatch start", { count: missingTexts.length });
      const res = await translateGoogleBatch(missingTexts);
      fresh = res.translations;
      totalChars = res.chars;
      debugLog("info", "api", "google translateBatch done", {
        count: missingTexts.length,
        chars: totalChars,
        elapsed: Date.now() - t0
      });
      await setBatch(missingTexts, fresh, cacheSuffix);
      await upsertGoogleUsage({
        url: sender?.tab?.url || "",
        title: "",
        engine: "google",
        model: "google-translate",
        inputTokens: 0,
        outputTokens: 0,
        cachedTokens: 0,
        billedInputTokens: 0,
        billedCostUSD: 0,
        chars: totalChars,
        segments: missingTexts.length,
        cacheHits,
        durationMs: 0,
        timestamp: Date.now()
      });
    }
    const result = cached.slice();
    missingIdxs.forEach((idx, k) => {
      result[idx] = fresh[k];
    });
    return {
      result,
      usage: { engine: "google", chars: totalChars, cacheHits }
    };
  }
  async function handleExtractGlossary(payload, sender) {
    debugLog("info", "glossary", "glossary extraction start", { inputHash: payload.inputHash, chars: payload.compressedText?.length });
    const settings = await getSettings();
    if (!settings.apiKey) {
      throw new Error("\u5C1A\u672A\u8A2D\u5B9A Gemini API Key\uFF0C\u8ACB\u81F3\u8A2D\u5B9A\u9801\u586B\u5165\u3002");
    }
    const { compressedText, inputHash } = payload;
    const cached = await getGlossary(inputHash);
    if (cached) {
      debugLog("info", "glossary", "glossary cache hit", { inputHash, terms: cached.length });
      return { glossary: cached, usage: { inputTokens: 0, outputTokens: 0, cachedTokens: 0 }, fromCache: true };
    }
    debugLog("info", "glossary", "calling Gemini (bypassing rate limiter)");
    const result = await extractGlossary(compressedText, settings);
    const { glossary, usage, _diag } = result;
    debugLog("info", "glossary", "Gemini returned glossary", { terms: glossary.length, usage, diag: _diag || null });
    if (glossary.length > 0) {
      await setGlossary(inputHash, glossary);
    }
    if (usage.inputTokens > 0 || usage.outputTokens > 0) {
      const billedInput = Math.max(
        0,
        Math.round(usage.inputTokens - (usage.cachedTokens || 0) * 0.75)
      );
      const glossaryModel = (settings.glossary?.model || "").trim() || settings.geminiConfig?.model;
      const glossaryPricing = getPricingForModel(glossaryModel, settings) || settings.pricing;
      const billedCost = computeBilledCostUSD(
        usage.inputTokens,
        usage.cachedTokens || 0,
        usage.outputTokens,
        glossaryPricing
      );
      await addUsage(billedInput, usage.outputTokens, billedCost);
    }
    debugLog("info", "glossary", "glossary extraction complete", {
      terms: glossary.length,
      inputHash,
      tabUrl: sender?.tab?.url
    });
    return { glossary, usage, fromCache: false, _diag: _diag || null };
  }
  browser.commands.onCommand.addListener(async (command) => {
    const match = command.match(/^translate-preset-(\d+)$/);
    if (!match) return;
    const slot = Number(match[1]);
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return;
    browser.tabs.sendMessage(tab.id, { type: "TRANSLATE_PRESET", payload: { slot } }).catch(() => {
    });
  });
  browser.runtime.onInstalled.addListener(async ({ reason, previousVersion }) => {
    debugLog("info", "system", `extension ${reason}`, {
      version: browser.runtime.getManifest().version,
      previousVersion: previousVersion || null
    });
    const currentVersion = browser.runtime.getManifest().version;
    await checkVersionAndClear(currentVersion);
    const wrote = await maybeWriteWelcomeNotice({ reason, previousVersion, currentVersion });
    if (wrote) {
      debugLog("info", "system", "welcome notice written", {
        from: previousVersion,
        to: currentVersion
      });
    }
    if (reason === "update" || reason === "install") {
      try {
        const { apiKey: syncKey } = await browser.storage.sync.get("apiKey");
        if (typeof syncKey === "string") {
          const { apiKey: localKey } = await browser.storage.local.get("apiKey");
          if (!localKey && syncKey) {
            await browser.storage.local.set({ apiKey: syncKey });
            debugLog("info", "system", "apiKey migrated from sync \u2192 local");
          }
          await browser.storage.sync.remove("apiKey");
        }
      } catch (err) {
        debugLog("warn", "system", "apiKey migration failed", { error: err.message });
      }
    }
  });
})();
