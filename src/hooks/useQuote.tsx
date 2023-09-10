import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";
import { Quote } from "../types";

const KEY_QUOTE = "Zen@Quote";
const KEY_QUOTE_NEXT_DATE = "Zen@QuoteNextDate";
const ZEN_API = "https://zenquotes.io/api/random";

export const useQuote = () => {
  const [quote, setQuote] = useState<Quote>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [nextDate, setNextDate] = useState<string>();

  const loadQuote = async () => {
    setIsLoading(true);
    setIsError(false);

    const storagedQuote = await AsyncStorage.getItem(KEY_QUOTE);
    const storagedQuoteNextDate = await AsyncStorage.getItem(
      KEY_QUOTE_NEXT_DATE
    );

    if (
      storagedQuote &&
      storagedQuoteNextDate &&
      moment(storagedQuoteNextDate) > moment()
    ) {
      setQuote(JSON.parse(storagedQuote));
      setNextDate(moment(storagedQuoteNextDate).format("YYYY-MM-DD HH:mm:ss"));
    } else {
      try {
        const response = axios.get<Quote[]>(ZEN_API);
        const quote = (await response).data[0];
        setQuote(quote);
        await AsyncStorage.setItem(KEY_QUOTE, JSON.stringify(quote));
        const tomorrow = `${moment()
          .add(1, "day")
          .format("YYYY-MM-DD")} 06:00:00`;
        await AsyncStorage.setItem(KEY_QUOTE_NEXT_DATE, tomorrow);
        setNextDate(tomorrow);
      } catch {
        setIsError(true);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadQuote();
  }, []);

  return {
    quote,
    isLoading,
    isError,
    nextDate,
  };
};
