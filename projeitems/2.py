fname='e44.txt'
fh=open(fname)
ff=open('abc.txt','w')
word=[]
for line in fh:
    word=list(line.strip().split())
    #print(word)
    l=[int(word[1][:-1]),int(word[2][:-1])]
    l1=[]
    for i in l:
        s=str(i)
        if(len(s)==5):
            deg=s[0]
            min=s[1:2+1]
            sec=s[3:4+1]
        else:
            deg=s[0:1+1]
            min=s[2:3+1]
            sec=s[4:5+1]
       #print(deg,min,sec)
        x=int(deg)+((int(min))/60.0)+((float(sec))/3600.0)
        l1.append(x)
    #print(l1)
    #data=word[0],str(l1)
    #word[3:len(word)]
    #print(data)
    #ff.write(str(data)+"\n")
    #ff.write(word[0]+" ")
    #ff.write(str(l1) +" ")
    #for i in range(3,len(word)):
     #   ff.write(word[i])
        #ff.write(word[0])
    
    print('''['<div class="info_content">' +'<h3> ''',end='')
    print(word[0]+"</h3>' +")
    print("'<h2><b>NAVIGATIONAL AIDS</b></h2>' + ")
    print("'<p> Lat,long"+str(l1)+"</p>' + ")
    print("'<p>No of routes:",end='')
    for i in range(3,len(word)):
        print(word[i],end='')
    print("</p>'")
    print("+'</div>'],")
    
    #for i in range(0,2):
        #ff.write(str(l1[i]),end=' ')
       # if(i==0):
        #    print(l1[i],end=',')
        #elif(i==1):
         #   print(l1[i],end='')
        #ff.write("\n")
    #print('],',end='')

            
            
            
            
        #print()
        
    #for i in range(1 ,3):
        #print(word[i],end=' ')        
        
    print()
ff.close()
