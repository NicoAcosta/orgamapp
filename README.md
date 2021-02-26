# OrgaMapp



## ¿Cómo usarlo?



### Definir la raiz

El área con el cual comienza el organigrama. Por ejemplo, la Gerencia General, la Presidencia, o la A.G.A. en una S.A.
Se utiliza la palabra reservada `raiz`

```
raiz Gerencia General
```



### Definir dependencias

Se utiliza una flecha `->`

#### Dependencia simple

```
Gerencia General -> Gerencia de Sistemas
```
*La Gerencia de Sistemas depende de la Gerencia General.*


#### Dependencias múltiples

Para agregar más de una dependencia a la vez, se escriben las áreas entre corchetes separadas por comas. Todo dentro de la misma línea.

```
Gerencia de Sistemas -> [Departamento de Diseño, Deparamento de Desarrollo, Departamento de QA]
```
es esquivalente a:
```
Gerencia de Sistemas -> Departamento de Diseño
Gerencia de Sistemas -> Departamento de Desarrollo
Gerencia de Sistemas -> Departamento de QA
```

#### Dependencias de distinto nivel jerárquico

La cantidad de guiones que componen la flecha indican la difencia de nivel de jerarquía entre ambas áreas. Siendo `-->` para una diferencia de 2 niveles, `--->` para tres, etc.

```
Departamento de Desarrollo -> Sección de Front End
Departamento de Desarrollo -> Sección de Back End
Departamento de Desarrollo --> Oficina de AI
```
*Del Departamento de Desarrollo dependen dos Secciones y una Oficina (que es de menor nivel jerárquico).*


### Definir asesorías

Se utiliza el símbolo `a>`

```
Gerencia de Finanzas a: Asesoría Legal
```
*El gerente de Finanzas recibe asesoría en materia legal.*

