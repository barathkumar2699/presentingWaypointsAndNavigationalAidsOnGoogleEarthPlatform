fname='places.txt'
fh=open(fname)
ff=open('abc.txt',"w")
l=list()
latlong=[]
word=[]
for line in fh:
    word=line.strip().split()
    #print(word)
    if(word!=[]):
        if(len(word)>0):
            q=(word[2][0:3])
            #print(q)
           # print(word)
            l2=[]
            for i in range(4,len(word)):
                #z=word[i].split(',')
                l2.append(word[i])
                
                
            list1=[]
            #print(l2)

            for i in l2:
                s=str(i)
                deg=s[0:1+1]
                mi=s[2:3+1]
                sec=s[4:5+1]
                x=int(deg)+((int(mi))/60.0)+((float(sec))/3600.0)
                #print(x)
                list1.append(x)

            ff.write(word[0]+" ")
            ff.write(word[1]+" ")
            ff.write(q+" ")
            ff.write(str(list1)+"\n")
            #print(list1)
            #print(word[0],word[1],q,str(list1))
            print("['"+ word[0]+"',",end='')
            for i in range(2):
                if(i==0):
                    print(list1[i] ,end=',')
                else:
                    print(list1[i],end='')
            print("],")

            #for i in l2:
                #print(i)
             #   x=int(i[0])+((int(i[1]))/60)+((float(i[2][:-1]))/3600.0)
             #   list1.append(x)
            #print(word[0],list1)
            
            #data=(word[0])+" "+str(list1[0])+" "+ str(list1[1])+"\n"
            #print(data)
            
            #fu=open('abc.txt',"w+")
            #fu.write(data)
            #fu.close()
            
                
    
    #print()

        
        
fh.close();
