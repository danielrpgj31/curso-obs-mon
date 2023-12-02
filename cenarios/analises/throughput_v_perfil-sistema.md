### Throughput versus Perfil de performance no S.O

O perfil determina alguns limites importantes de throughput, basicamente
em função do aumento da frequencia por clock e alguns outros fatores. 

As variacoes ocorrem em função dos limites impostos ou liberados durante a troca de perfil. 

Veja exemplos abaixo

```bash
Analise 'Perfil Power'  'Throughput'    'Diferença'    'Users'   'Dataset'   'Ramp up'   'GC Semi Space' 'UV_THREADPOOL_SIZE'    'Tempo de teste'

1       Performance     3120                           100       100000      0.1         0               30                      5min
2       Balanced        3030            -3%            100       100000      0.1         0               30                      6min
3       Power Saver     864             -73%           100       100000      0.1         0               30                      5min
4       Performance     3447            +10%           100       100000      0.1         24              30                      5min
5       Performance     3387            +9%            100       100000      0.1         48              30                      5min
```

* Esclarecimentos

Campo 'Diferença' representa o percentual da metrica em relação a metrica no perfil Performance. Quanto mais restritivo o perfil,
mais baixo o valor do percentual, represetando que esta mais impactado por restricoes de cpu/frequencia. 


