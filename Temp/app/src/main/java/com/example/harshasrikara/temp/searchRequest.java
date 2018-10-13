package com.example.harshasrikara.temp;

import java.io.Serializable;

public class searchRequest implements Serializable
{
    String search;
    String extraInfo;

    public searchRequest(String str, String extra)
    {
        search = str;
        extraInfo = extra;
    }
    public searchRequest(String str)
    {
        search = str;
    }

    public void setSearch(String newString)
    {
        search = newString;
    }
    public void setExtraInfo(String newString)
    {
        extraInfo = newString;
    }
    public String getSearch()
    {
        return search;
    }
    public String getExtraInfo()
    {
        return extraInfo;
    }
}
